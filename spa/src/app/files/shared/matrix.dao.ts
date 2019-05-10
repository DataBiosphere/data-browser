/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to Matrix-related end points.
 *
 * Dummy: https://uqyehanq03.execute-api.us-east-1.amazonaws.com/dummy/v0/matrix
 * Dev: https://matrix.dev.data.humancellatlas.org/v0/matrix
 * Staging: https://matrix.staging.data.humancellatlas.org/v0/matrix
 * Integration: https://matrix.integration.data.humancellatlas.org/v0/matrix
 */

// Core dependencies
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { ICGCQuery } from "./icgc-query";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixHttpResponse } from "./matrix-http-response.model";
import { MatrixStatus } from "./matrix-status.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermDAO } from "./search-term.dao";

@Injectable()
export class MatrixDAO {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermDAO} searchTermDAO
     * @param {HttpClient} httpClient
     */
    constructor(
        private configService: ConfigService,
        private searchTermDAO: SearchTermDAO,
        private httpClient: HttpClient) {
    }

    /**
     * Request the set of possible matrix file formats.
     *
     * Docs at: https://github.com/HumanCellAtlas/matrix-service/blob/develop/config/matrix-api.yml
     *
     * @returns {Observable<string[]>}
     */
    public fetchFileFormats(): Observable<string[]> {

        return this.httpClient.get<any>(`${this.configService.getMatrixURL()}/formats`);
    }

    /**
     * Query matrix request status.
     *
     * Docs at: https://github.com/HumanCellAtlas/matrix-service/blob/develop/config/matrix-api.yml
     *
     * @param {string} requestId
     * @returns {Observable<MatrixResponse>}
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
     * Execute matrix request.
     *
     * Docs at: https://github.com/HumanCellAtlas/matrix-service/blob/develop/config/matrix-api.yml
     *
     * @param {SearchTerm[]} searchTerms
     * @param {MatrixFormat} matrixFormat
     * @returns {Observable<MatrixResponse>}
     */
    public requestMatrix(searchTerms: SearchTerm[], matrixFormat: MatrixFormat): Observable<MatrixResponse> {

        const manifestUrl = this.buildMatrixManifestUrl(searchTerms);
        
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
     * Build the manifest download URL - required for requesting a Matrix export.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {string} format
     * @returns {string}
     */
    public buildMatrixManifestUrl(searchTerms: SearchTerm[], format?: string): string {

        const query = new ICGCQuery(this.searchTermDAO.marshallSearchTerms(searchTerms), format);

        let params = new URLSearchParams();
        Object.keys(query).forEach((paramName) => {
            params.append(paramName, query[paramName]);
        });

        return this.buildApiUrl(`/manifest/files?${params.toString()}`);
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
     * Build full API URL
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {

        const domain = this.configService.getAPIURL();
        return `${domain}${url}`;
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
