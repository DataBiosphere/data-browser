/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating Matrix-related functionality.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, interval, Observable, of, Subject } from "rxjs";
import { catchError, map, retry, switchMap, take, takeUntil } from "rxjs/operators";

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
import { ManifestStatus } from "./manifest-status.model";
import { ProjectMatrixUrls } from "./project-matrix-urls.model";

@Injectable()
export class MatrixService {

    /**
     * @param {ConfigService} configService
     * @param {FileManifestService} manifestService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private manifestService: FileManifestService,
                private httpClient: HttpClient) {
    }

    /**
     * Remove all file types other than matrix. Add matrix file type if not already selected. Required for when we are
     * querying the manifest end point before request the matrix URL.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {SearchTerm[]}
     */
    public createMatrixableSearchTerms(
        searchTerms: SearchTerm[]): SearchTerm[] {

        let matrixAdded = false;
        const matrixSearchTerms = searchTerms.reduce((accum, searchTerm) => {

            // Check if this search term is for a file format
            if ( searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT ) {

                // Only allow MATRIX to be added as a file format
                if ( searchTerm.getSearchValue() === FileFormat.MATRIX ) {
                    accum.push(searchTerm);
                    matrixAdded = true;
                }
            }
            // Add search terms for all other facets, as is
            else {
                accum.push(searchTerm);
            }
            return accum;
        }, []);

        // If matrix wasn't in the set of selected terms, add it now
        if ( !matrixAdded ) {
            matrixSearchTerms.push(new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX));
        }

        return matrixSearchTerms;
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
     * Fetch the set of matrix URLs, if any, that are available for the specified project.
     *
     * @param {Map<string, ProjectMatrixUrls>} projectMatrixUrls
     * @param {string} entityId
     */
    public fetchProjectMatrixURLs(projectMatrixUrls: Map<string, ProjectMatrixUrls>, entityId: string): Observable<ProjectMatrixUrls> {

        // If we already have the matrix URLs for this project, return the cached version
        if ( projectMatrixUrls.has(entityId) ) {
            return of(projectMatrixUrls.get(entityId));
        }

        // Otherwise we don't have the matrix URLs for this project cached, request them from the server
        return forkJoin(
            this.getProjectMatrixUrl(entityId, "csv.zip"),
            this.getProjectMatrixUrl(entityId, "loom"),
            this.getProjectMatrixUrl(entityId, "mtx.zip")
        ).pipe(
            map(([csvUrl, loomUrl, mtxUrl]) => {
                return new ProjectMatrixUrls(entityId, csvUrl, loomUrl, mtxUrl);
            })
        );
    }

    /**
     * Request manifest URL then kick off matrix URL request.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {MatrixFormat} matrixFormat
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<MatrixResponse>}
     */
    public requestMatrixUrl(
        searchTerms: SearchTerm[], matrixFormat: MatrixFormat, killSwitch$: Observable<boolean>): Observable<MatrixResponse> {

        const matrixResponse$ = new Subject<MatrixResponse>();

        const manifestRequest$ =
            this.requestFileManifestUrl(searchTerms, killSwitch$)
                .subscribe((manifestResponse: ManifestResponse) => {

                    // Manifest URL request is complete - kick off matrix URL request
                    if ( manifestResponse.status === ManifestStatus.COMPLETE ) {
                        manifestRequest$.unsubscribe();
                        return this.sendRequestMatrixUrl(manifestResponse, matrixFormat, matrixResponse$, killSwitch$);
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
     * A client-side error occurred during request that we couldn't recover from - build up dummy FAILED matrix
     * response.
     *
     * @param {string} requestId
     * @returns {MatrixResponse}
     */
    private handleMatrixStatusError(requestId: string): Observable<MatrixResponse> {

        return of({
            eta: "",
            matrixUrl: "",
            message: "",
            requestId: requestId,
            status: MatrixStatus.FAILED
        });
    }

    /**
     * Returns the project matrix CSV URL, if it's available for download. Otherwise returns null.
     *
     * @param {string} projectId
     * @param {string} matrixFormat
     * @returns {Observable<string>}
     */
    private getProjectMatrixUrl(projectId: string, matrixFormat: string): Observable<string> {

        const url = this.configService.getProjectPreparedMatrixDownloadURL(projectId, matrixFormat);
        return this.httpClient.head<any>(url).pipe(
            catchError(() => of("")), // Convert error response to ""
            switchMap((valueIfError) => valueIfError === "" ? of(null) : of(url)) // Return URL if 200, otherwise null
        );
    }

    /**
     * Get the manifest URL for the matrix request.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {Observable<boolean>} killSwitch$
     * @returns {ManifestResponse}
     */
    private requestFileManifestUrl(searchTerms: SearchTerm[], killSwitch$: Observable<boolean>): Observable<ManifestResponse> {

        // Add matrix file format, if not yet specified
        const matrixSearchTerms = this.createMatrixableSearchTerms(searchTerms);
        return this.manifestService.requestMatrixFileManifestUrl(matrixSearchTerms, killSwitch$);
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
     * Send HTTP request for matrix URL, and set up polling to monitor status.
     *
     * @param {ManifestResponse} manifestResponse
     * @param {MatrixFormat} matrixFormat
     * @param {Subject<MatrixResponse>} matrixResponse$
     * @param {Observable<boolean>} killSwitch$
     */
    private sendRequestMatrixUrl(manifestResponse, matrixFormat, matrixResponse$, killSwitch$) {

        // Build up the matrix POST body
        const body = {
            bundle_fqids_url: manifestResponse.fileUrl,
            format: MatrixFormat[matrixFormat] || matrixFormat // Allow for file formats that have not yet been added to enum
        };

        const httpRequest$ = this.httpClient.post<MatrixHttpResponse>(this.configService.getMatrixURL(), body);
        this.pollRequestMatrixUrl(null, httpRequest$, 0, matrixResponse$, killSwitch$);
    }

    /**
     * 
     */
    private pollRequestMatrixUrl(requestId, httpRequest$, delay, matrixResponse$, killSwitch$) {

            const subscription = interval(delay)
                .pipe(
                    take(1),
                    switchMap(() => {

                        return httpRequest$.pipe(
                            retry(2),
                            catchError(this.handleMatrixStatusError.bind(this, requestId)),
                            map(this.bindMatrixResponse.bind(this))
                        );
                    }),
                    takeUntil(killSwitch$)
                )
                .subscribe((response: MatrixResponse) => {

                    // Let subscribers know the latest status
                    matrixResponse$.next(response);
                    
                    // If the request is still in progress, poll again for status
                    if ( response.status === MatrixStatus.IN_PROGRESS ) {
                        const requestId = response.requestId;
                        const getRequest$ = 
                            this.httpClient.get<MatrixHttpResponse>(`${this.configService.getMatrixURL()}/${requestId}`);
                        this.pollRequestMatrixUrl(requestId, getRequest$, 5000, matrixResponse$, killSwitch$);
                    }

                    // Clean up each loop through the poll
                    subscription.unsubscribe();
                });
    }
}
