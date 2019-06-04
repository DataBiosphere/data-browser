/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating system-related functionality.
 */

// Core dependencies
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, switchMap } from "rxjs/operators";
import { Observable, of } from "rxjs";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { HealthResponse } from "./health/health-response.model";
import { HealthRequestStatus } from "./health/health-request-status.model";
import { HealthHttpResponse } from "./health/health-http-response.model";

@Injectable()
export class SystemService {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {
    }

    /**
     * Fetch the current system status.
     *
     * @returns {Observable<HealthResponse>}
     */
    public healthCheck(): Observable<HealthResponse> {

        const url = this.configService.buildApiUrl("/health");
        return this.httpClient
            .get<HealthHttpResponse>(url)
            .pipe(
                catchError(this.handleHealthError.bind(this)),
                switchMap(this.bindHealthResponse.bind(this))
            );
    }

    /**
     * Normalize download HTTP response to FE-friendly format.
     *
     * @param {HealthHttpResponse} response
     * @returns {HealthResponse}
     */
    private bindHealthResponse(response: HealthHttpResponse): Observable<HealthResponse> {

        return of({
            ok: response.up,
            indexing: this.isIndexing(response),
            status: HealthRequestStatus.COMPLETE
        });
    }

    /**
     * An error occurred during a health check - return generalized error response (with no bundles or documents
     * currently being indexed).
     *
     * @param {HttpErrorResponse} error
     * @returns {FileDownloadResponse}
     */
    private handleHealthError(error: HttpErrorResponse): Observable<HealthHttpResponse> {

        return of({
            up: false,
            unindexed_bundles: 0,
            unindexed_documents: 0
        });
    }

    /**
     * Convert the value of the file download status to FE-friendly value.
     *
     * @param {HealthHttpResponse} response
     * @returns {boolean}
     */
    private isIndexing(response: HealthHttpResponse): boolean {

        return response.unindexed_bundles > 0 || response.unindexed_documents > 0;
    }
}
