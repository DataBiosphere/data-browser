/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating Matrix-related functionality.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixStatus } from "./matrix-status.model";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFormat } from "./file-format.model";
import { ICGCQuery } from "./icgc-query";
import { MatrixHttpResponse } from "./matrix-http-response.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";
import { SearchTermService } from "./search-term.service";

@Injectable()
export class MatrixService {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermService} searchTermService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
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
     * Query matrix request status.
     *
     * @param {string} requestId
     * @returns {MatrixResponse}
     */
    public getMatrixStatus(requestId: string): Observable<MatrixResponse> {

        return this.httpClient
            .get<MatrixHttpResponse>(`${this.configService.getMatrixURL()}/${requestId}`)
            .pipe(
                retry(3),
                catchError(this.handleMatrixStatusError.bind(this, requestId)),
                map(this.bindMatrixResponse.bind(this))
            );
    }

    /**
     * Request matrix export.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {MatrixFormat} matrixFormat
     * @returns {MatrixResponse}
     */
    public requestMatrix(searchTerms: SearchTerm[], matrixFormat: MatrixFormat): Observable<MatrixResponse> {

        // Add matrix file format, if not yet specified
        const matrixSearchTerms = this.isMatrixFileFormatSelected(searchTerms) ?
            searchTerms :
            this.addMatrixFileFormatToSearchTerms(searchTerms);

        // Kick off matrix request
        const manifestUrl = this.buildMatrixManifestUrl(matrixSearchTerms);

        // Build up the POST body
        const body = {
            bundle_fqids_url: manifestUrl,
            format: MatrixFormat[matrixFormat] || matrixFormat // Allow for file formats that have not yet been added to enum
        };

        return this.httpClient
            .post<MatrixHttpResponse>(this.configService.getMatrixURL(), body)
            .pipe(
                map(this.bindMatrixResponse.bind(this))
            );
    }

    /**
     * Returns true if matrix request is completed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixRequestCompleted(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.COMPLETE;
    }


    /**
     * Returns true if matrix request has failed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixRequestFailed(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.FAILED;
    }

    /**
     * Returns true if matrix request is in progress.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixRequestInProgress(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.IN_PROGRESS;
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
     * Build the manifest download URL - required for requesting a Matrix export.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {string} format
     * @returns {string}
     */
    private buildMatrixManifestUrl(searchTerms: SearchTerm[], format?: string): string {

        const query = new ICGCQuery(this.searchTermService.marshallSearchTerms(searchTerms), format);

        let params = new URLSearchParams();
        Object.keys(query).forEach((paramName) => {
            params.append(paramName, query[paramName]);
        });

        return this.configService.buildApiUrl(`/manifest/files?${params.toString()}`);
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
     * Convert the value of the matrix status to FE-friendly value.
     *
     * @param {string} status
     * @returns {MatrixStatus}
     */
    private translateMatrixStatus(status: string): MatrixStatus {

        const statusKey = status.toUpperCase().replace(" ", "_");
        return MatrixStatus[statusKey];
    }
}
