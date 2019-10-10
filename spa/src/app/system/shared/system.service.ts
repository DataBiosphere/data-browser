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
import { HealthHttpResponse } from "./health/health-http-response.model";
import { IndexResponse } from "./index/index-response.model";
import { IndexHttpResponse } from "./index/index-http-response.model";
import { IndexRequestStatus } from "./index/index-request-status.model";

@Injectable()
export class SystemService {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {
    }

    /**
     * Fetch the current health status.
     *
     * @returns {Observable<HealthResponse>}
     */
    public checkHealth(): Observable<HealthResponse> {

        const url = this.configService.getDCPHealthCheckURL();
        return this.httpClient
            .get<HealthHttpResponse>(url)
            .pipe(
                catchError(this.handleHealthError.bind(this)),
                switchMap(this.bindHealthResponse.bind(this))
            );
    }

    /**
     * Fetch the current index status.
     *
     * @returns {Observable<IndexResponse>}
     */
    public checkIndexStatus(): Observable<IndexResponse> {

        const url = this.configService.buildApiUrl("/health/progress");
        return this.httpClient
            .get<IndexHttpResponse>(url)
            .pipe(
                catchError(this.handleIndexError.bind(this)),
                switchMap(this.bindIndexResponse.bind(this))
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
            serviceName: response.service_name,
            ok: response.status === "ok" 
        });
    }
    
    /**
     * Normalize download HTTP response to FE-friendly format.
     *
     * @param {IndexHttpResponse} response
     * @returns {IndexResponse}
     */
    private bindIndexResponse(response: IndexHttpResponse): Observable<IndexResponse> {

        return of({
            ok: response.up,
            indexing: this.isIndexing(response),
            status: IndexRequestStatus.COMPLETE
        });
    }

    /**
     * An error occurred during a index status check - return generalized error response (with no bundles or documents
     * currently being indexed).
     *
     * @param {HttpErrorResponse} error
     * @returns {IndexHttpResponse}
     */
    private handleIndexError(error: HttpErrorResponse): Observable<IndexHttpResponse> {

        return of({
            up: false,
            progress: {
                unindexed_bundles: 0,
                unindexed_documents: 0
            }
        });
    }

    /**
     * An error occurred during a health check - return generalized error response.
     *
     * @param {HttpErrorResponse} error
     * @returns {IndexHttpResponse}
     */
    private handleHealthError(error: HttpErrorResponse): Observable<HealthResponse> {

        return of({
            serviceName: "",
            ok: false
        });
    }

    /**
     * Convert the value of the file download status to FE-friendly value.
     *
     * @param {IndexHttpResponse} response
     * @returns {boolean}
     */
    private isIndexing(response: IndexHttpResponse): boolean {

        return response.progress.unindexed_bundles > 0 || response.progress.unindexed_documents > 0;
    }
}
