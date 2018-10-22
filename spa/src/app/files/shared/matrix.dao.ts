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
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";
import { catchError, map, retry } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixHttpResponse } from "./matrix-http-response.model";
import { MatrixStatus } from "./matrix-status.model";

@Injectable()
export class MatrixDAO {

    // Constants
    private MATRIX_URL = "https://matrix.integration.data.humancellatlas.org/v0/matrix";
    private MATRIX_API_KEY = "Z9rUPlwAt26XpKkHYqp3S3nVb6798au97ttzQ5VT";

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {
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

        // Set up headers
        const headers = new HttpHeaders().set("X-API-KEY", this.MATRIX_API_KEY);

        // return this.httpClient
        //     .get<MatrixHttpResponse>(`${this.MATRIX_URL}/${requestId}`, {headers})
        //     .map(this.bindMatrixResponse.bind(this));

        return this.httpClient
            .get<MatrixHttpResponse>(`${this.MATRIX_URL}/${requestId}`, {headers})
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
     * @param {string} manifestUrl
     * @param {MatrixFormat} matrixFormat
     * @returns {Observable<MatrixResponse>}
     */
    public requestMatrix(manifestUrl: string, matrixFormat: MatrixFormat): Observable<MatrixResponse> {

        // Build up the POST body
        const body = {
            bundle_fqids_url: manifestUrl,
            /*bundle_fqids: [
                "0f997914-43c2-45e2-b79f-99167295b263.2018-10-17T204940.626010Z",
                "167a2b69-f52f-4a0a-9691-d1db62ef12de.2018-10-17T201019.320177Z",
                "b2965ca9-4aca-4baf-9606-215508d1e475.2018-10-17T200207.329078Z",
                "8d567bed-a9aa-4a39-9467-75510b965257.2018-10-17T191234.528671Z",
                "ba9c63ac-6db5-48bc-a2e3-7be4ddd03d97.2018-10-17T173508.111787Z",
            ],*/
            format: MatrixFormat[matrixFormat]
        };

        // Set up headers
        const headers = new HttpHeaders().set("X-API-KEY", this.MATRIX_API_KEY);

        return this.httpClient
            .post<MatrixHttpResponse>(this.MATRIX_URL, body, {headers})
            .map(this.bindMatrixResponse.bind(this));
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

        return Observable.of({
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
