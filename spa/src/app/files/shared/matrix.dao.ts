/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to Matrix-related end points.
 */

// Core dependencies
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixHttpResponse } from "./matrix-http-response.model";
import { MatrixStatus } from "./matrix-status.model";

@Injectable()
export class MatrixDAO {

    // Constants
    private MATRIX_URL = "https://uqyehanq03.execute-api.us-east-1.amazonaws.com/dummy/v0/matrix";
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

        // Build up the request params
        // const params = new HttpParams()
        //     .append("request_id", requestId);

        // Set up headers
        const headers = new HttpHeaders().set("X-API-KEY", this.MATRIX_API_KEY);

        return this.httpClient
            .get<MatrixHttpResponse>(`${this.MATRIX_URL}/${requestId}`, {/*params,*/ headers})
            .map(this.bindMatrixResponse.bind(this));
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
