/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating Matrix-related functionality.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Observable, of, Subject } from "rxjs";
import { catchError, filter, map, retry, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixStatus } from "./matrix-status.model";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFormat } from "./file-format.model";
import { FileManifestService } from "./file-manifest.service";
import { ManifestResponse } from "./manifest-response.model";
import { MatrixHttpResponse } from "./matrix-http-response.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";
import { SearchTermService } from "./search-term.service";
import { FileFacet } from "./file-facet.model";
import { ManifestStatus } from "./manifest-status.model";
import { ICGCQuery } from "./icgc-query";
import { ManifestDownloadFormat } from "./manifest-download-format.model";
import { ManifestHttpResponse } from "./manifest-http-response.model";

@Injectable()
export class MatrixService {

    /**
     * @param {ConfigService} configService
     * @param {FileManifestService} manifestService
     * @param {SearchTermService} searchTermService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private manifestService: FileManifestService,
                private searchTermService: SearchTermService,
                private httpClient: HttpClient) {
    }

    /**
     * Request the set of possible matrix file formats.
     *
     * @returns {Observable<string[]>}
     */
    public fetchFileFormats(): Observable<string[]> {

        return this.httpClient.get<any>(`${this.configService.getMatrixURL()}/formats`);
    }
    
    /**
     * Request manifest URL then kick off matrix URL request.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {MatrixFormat} matrixFormat
     * @returns {Observable<MatrixResponse>}
     */
    public requestMatrixUrl(
        searchTerms: SearchTerm[], matrixFormat: MatrixFormat): Observable<MatrixResponse> {

        // Set up polling for matrix URL completion
        const matrixResponse$ = this.initMatrixUrlRequestPoller();
        
        const manifestRequest$ =
            this.requestFileManifestUrl(searchTerms)
                .subscribe((manifestResponse: ManifestResponse) => {

                    // Manifest URL request is complete - kick off matrix URL request
                    if ( manifestResponse.status === ManifestStatus.COMPLETE ) {
                        manifestRequest$.unsubscribe();
                        return this.initMatrixUrlRequest(manifestResponse, matrixResponse$, matrixFormat);
                    }
                    
                    // Manifest URL request failed - update matrix response to indicate failure
                    if ( manifestResponse.status === ManifestStatus.FAILED ) {
                        manifestRequest$.unsubscribe();
                        matrixResponse$.next({
                            status: MatrixStatus.FAILED
                        } as MatrixResponse);
                        return;
                    }
    
                    // Manifest URL request is in progress - update matrix status 
                    matrixResponse$.next({
                        status: MatrixStatus.MANIFEST_IN_PROGRESS
                    } as MatrixResponse);
                });

        return matrixResponse$.asObservable();
    }

    /**
     * Returns true if matrix request is completed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixUrlRequestCompleted(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.COMPLETE;
    }

    /**
     * Returns true if matrix request has failed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixUrlRequestFailed(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.FAILED;
    }

    /**
     * Returns true if matrix request has been initiated.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixUrlRequestInitiated(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.MANIFEST_IN_PROGRESS;
    }

    /**
     * Returns true if matrix request is in progress.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixUrlRequestInProgress(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.IN_PROGRESS;
    }

    /**
     * Returns true if matrix request has not yet started.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixUrlRequestNotStarted(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.NOT_STARTED;
    }

    /**
     * Add matrix file format to the set of search terms.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {SearchTerm[]}
     */
    private addMatrixFileFormatToSearchTerms(searchTerms: SearchTerm[]): SearchTerm[] {

        return [
            ...searchTerms,
            new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
        ];
    }

    /**
     * Normalize matrix response to FE-friendly format.
     *
     * @param {MatrixHttpResponse} response
     * @returns {MatrixResponse}
     */
    private bindMatrixResponse(response: MatrixHttpResponse): MatrixResponse {

        return Object.assign({}, response, {
            matrixUrl: response.matrix_location,
            requestId: response.request_id,
            status: this.translateMatrixStatus(response.status)
        });
    }

    /**
     * Set up polling to check for matrix URL completion - if request is still in progress, continue to poll. Otherwise
     * kill polling subscription.
     */
    private initMatrixUrlRequestPoller() {

        const matrixResponse$ = new Subject<MatrixResponse>();
        matrixResponse$
            .pipe(
                // Do nothing while we're waiting for manifest request to complete
                filter(response => response.status !== MatrixStatus.MANIFEST_IN_PROGRESS)
            )
            .subscribe((response: MatrixResponse) => {

                if ( response.status === MatrixStatus.IN_PROGRESS ) {
                    return this.pollMatrixUrlRequestStatus(response, matrixResponse$);
                }

                matrixResponse$.unsubscribe();
            });
        
        return matrixResponse$;
    }

    /**
     * Request matrix URL - either the initial request or a status update request.
     *
     * @param {string} requestId
     * @param {Observable<MatrixHttpResponse>} httpRequest$
     * @param {Subject<MatrixResponse>} matrixResponse$
     */
    private sendMatrixUrlRequest(
        requestId: string, httpRequest$: Observable<MatrixHttpResponse>, matrixResponse$: Subject<MatrixResponse>) {

        httpRequest$
            .pipe(
                retry(2),
                catchError(this.handleMatrixStatusError.bind(this, requestId)),
                map(this.bindMatrixResponse.bind(this))
            )
            .subscribe((response: MatrixResponse) => {
                matrixResponse$.next(response);
            });
    }

    /**
     * A client-side error occurred during request that we couldn't recover from - build up dummy FAILED matrix
     * response.
     *
     * @param {string} requestId
     * @returns {MatrixResponse}
     */
    private handleMatrixStatusError(requestId: string): Observable<MatrixResponse> {
console.log("error")
        return of({
            eta: "",
            matrixUrl: "",
            message: "",
            requestId: requestId,
            status: MatrixStatus.FAILED
        });
    }

    /**
     * Returns true if there matrix file format is in the current set of selected search terms.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {boolean}
     */
    private isMatrixFileFormatSelected(searchTerms: SearchTerm[]): boolean {

        return searchTerms.some((searchTerm) =>
            searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT &&
            searchTerm.getSearchValue() === FileFormat.MATRIX);
    }
    
    /**
     * Get the manifest URL for the matrix request.
     * 
     * @param {SearchTerm[]} searchTerms
     * @returns {ManifestResponse}
     */
    private requestFileManifestUrl(searchTerms: SearchTerm[]): Observable<ManifestResponse> {

        // Add matrix file format, if not yet specified
        const matrixSearchTerms = this.isMatrixFileFormatSelected(searchTerms) ?
            searchTerms :
            this.addMatrixFileFormatToSearchTerms(searchTerms);
        
        return this.manifestService.requestMatrixFileManifestUrl(matrixSearchTerms);
    }

    /**
     * Send HTTP request for matrix URL.
     *
     * @param {ManifestResponse} manifestResponse
     * @param {Subject<MatrixResponse>} matrixResponse$
     * @param {MatrixFormat} matrixFormat
     */
    private initMatrixUrlRequest(
        manifestResponse: ManifestResponse, matrixResponse$: Subject<MatrixResponse>, matrixFormat: MatrixFormat) {

        // Build up the matrix POST body
        const body = {
            bundle_fqids_url: manifestResponse.fileUrl,
            format: MatrixFormat[matrixFormat] || matrixFormat // Allow for file formats that have not yet been added to enum
        };

        const httpRequest$ = this.httpClient.post<MatrixHttpResponse>(this.configService.getMatrixURL(), body);
        this.sendMatrixUrlRequest(null, httpRequest$, matrixResponse$);
    }

    /**
     * Convert the value of the matrix status to FE-friendly value.
     *
     * @param {string} status
     * @returns {MatrixStatus}
     */
    private translateMatrixStatus(status: string): MatrixStatus {

        const statusKey = status.toUpperCase().replace(" ", "_");
        return MatrixStatus[statusKey];
    }

    /**
     * Send request to fetch matrix URL request status.
     *
     * @param {MatrixResponse} response
     * @param {Subject<MatrixResponse>} matrixResponse$
     */
    private pollMatrixUrlRequestStatus(response: MatrixResponse, matrixResponse$: Subject<MatrixResponse>) {

        interval(5000)
            .pipe(
                take(1)
            )
            .subscribe(() => {
                const requestId = response.requestId;
                const getRequest =
                    this.httpClient.get<MatrixHttpResponse>(`${this.configService.getMatrixURL()}/${requestId}`);
                this.sendMatrixUrlRequest(requestId, getRequest, matrixResponse$);
            });
    }
}
