/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Abstract base-class service for coordinating system-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Catalog } from "../../files/catalog/catalog.model";
import { HttpService } from "../../files/http/http.service";
import { HealthResponse } from "./health/health-response.model";
import { HealthHttpResponse } from "./health/health-http-response.model";
import { IndexResponse } from "./index/index-response.model";
import { IndexHttpResponse } from "./index/index-http-response.model";
import { IndexRequestStatus } from "./index/index-request-status.model";
import { AppState } from "../../_ngrx/app.state";
import { SystemStatusRequestAction } from "../_ngrx/system-status-request.action";
import { selectSystemStatus } from "../_ngrx/system.selectors";
import { SystemStatusResponse } from "./system-status-response.model";

@Injectable()
export class SystemService {

    /**
     * @param {ConfigService} configService
     * @param {HttpService} httpService
     * @param {HttpClient} httpClient
     * @param {Store<AppState>} store
     */
    constructor(
        protected configService: ConfigService,
        protected httpService: HttpService,
        protected httpClient: HttpClient,
        private store: Store<AppState>) {}

    /**
     * Control flow of system status init during app init. Kick of request for system status and wait for response
     * before allowing app init to continue.
     *
     * @returns {Promise<void>}
     */
    public initSystemStatus(catalog: Catalog): Promise<void> {

        this.store.dispatch(new SystemStatusRequestAction(catalog));
        return new Promise((resolve) => {

            this.store.pipe(
                select(selectSystemStatus),
                filter(systemStatus => !systemStatus.loading),
                take(1)
            ).subscribe(() => {
                resolve();
            })
        });
    }

    /**
     * Fetch the current system status; uses Azul API to determine overall system status as well as indexing status.
     *
     * @param {Catalog} catalog
     */
    public fetchSystemStatus(catalog: Catalog): Observable<SystemStatusResponse> {

        return this.checkIndexStatus(catalog).pipe(
            switchMap(indexResponse => {
                return of({
                    ok: indexResponse.ok,
                    indexing: indexResponse.indexing,
                    indexingStatus: indexResponse.status
                });
            })
        )
    }

    /**
     * Fetch the current Azul system status and index status.
     *
     * @param {Catalog} catalog
     * @returns {Observable<IndexResponse>}
     */
    private checkIndexStatus(catalog: Catalog): Observable<IndexResponse> {

        const url = this.configService.getIndexStatusUrl();
        const params = this.httpService.createIndexParams(catalog, {});
        return this.httpClient
            .get<IndexHttpResponse>(url, {params})
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
            ok: /*response.status === "ok" */true // Temporarily hide banner for DCP1 - see #1366.
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
            // indexing: true,
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
