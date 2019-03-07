/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to system-related end points.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { catchError, retry, switchMap } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { HealthHttpResponse } from "./health/health-http-response.model";
import { HealthRequestStatus } from "./health/health-request-status.model";
import { HealthResponse } from "./health/health-response.model";

@Injectable()
export class SystemDAO {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {
    }

    /**
     * Fetch current system status.
     *
     * @returns {Subject<HealthResponse>}
     *
     */
    public healthCheck(): Observable<HealthResponse> {

        const url = this.buildApiUrl("/health");
        return this.httpClient
            .get<HealthHttpResponse>(url)
                .pipe(
                    retry(3),
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

        return Observable.of({
            indexing: this.isIndexing(response),
            status: HealthRequestStatus.COMPLETE
        });
    }

    /**
     * Build full API URL.
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {

        const domain = this.configService.getAPIURL();
        return `${domain}${url}`;
    }

    /**
     * An error occurred during a health check - return error state.
     *
     * @returns {FileDownloadResponse}
     */
    private handleHealthError(): Observable<HealthResponse> {

        return Observable.of({
            indexing: false,
            status: HealthRequestStatus.FAILED
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
