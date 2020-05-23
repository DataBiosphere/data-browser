/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Abstract base-class service for coordinating system-related functionality.
 */

// Core dependencies
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { HealthResponse } from "./health/health-response.model";
import { HealthHttpResponse } from "./health/health-http-response.model";
import { IndexResponse } from "./index/index-response.model";
import { IndexHttpResponse } from "./index/index-http-response.model";
import { IndexRequestStatus } from "./index/index-request-status.model";
import { SystemStatusResponse } from "./system-status-response.model";

export abstract class AbstractSystemService {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(protected configService: ConfigService, protected httpClient: HttpClient) {}

    /**
     * Fetch the current system status.
     */
    public abstract fetchSystemStatus(): Observable<SystemStatusResponse>;

    /**
     * Fetch the current DCP-wide health status.
     *
     * @returns {Observable<HealthResponse>}
     */
    protected checkHealth(): Observable<HealthResponse> {

        const url = this.configService.getDCPHealthCheckUrl();
        return this.httpClient
            .get<HealthHttpResponse>(url)
            .pipe(
                catchError(this.handleHealthError.bind(this)),
                switchMap(this.bindHealthResponse.bind(this))
            );
    }

    /**
     * Fetch the current Azul system status and index status.
     *
     * @returns {Observable<IndexResponse>}
     */
    protected checkIndexStatus(): Observable<IndexResponse> {

        const url = this.configService.getIndexStatusUrl();
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
    protected bindHealthResponse(response: HealthHttpResponse): Observable<HealthResponse> {

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
    protected bindIndexResponse(response: IndexHttpResponse): Observable<IndexResponse> {

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
    protected handleIndexError(error: HttpErrorResponse): Observable<IndexHttpResponse> {

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
    protected handleHealthError(error: HttpErrorResponse): Observable<HealthResponse> {

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
    protected isIndexing(response: IndexHttpResponse): boolean {

        return response.progress.unindexed_bundles > 0 || response.progress.unindexed_documents > 0;
    }
}
