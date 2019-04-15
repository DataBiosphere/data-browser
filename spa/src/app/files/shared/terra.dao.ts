/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Data access object, connecting to Terra-related end points.
 */

// Core dependencies
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Observable, of, Subject } from "rxjs";
import { catchError, retry, switchMap, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { ExportToTerraResponse } from "./export-to-terra-response.model";
import { FileFacet } from "./file-facet.model";
import { ExportToTerraHttpResponse } from "./export-to-terra-http-response.model";
import { ExportToTerraStatus } from "./export-to-terra-status.model";
import { FileHttpService } from "./file-http.service";
import { ICGCQuery } from "./icgc-query";
import { SearchTerm } from "../search/search-term.model";

@Injectable()
export class TerraDAO {

    /**
     * @param {ConfigService} configService
     * @param {FileHttpService} fileHttpService
     * @param {HttpClient} httpClient
     */
    constructor(
        private configService: ConfigService,
        private fileHttpService: FileHttpService,
        private httpClient: HttpClient) {
    }

    /**
     * Export to Terra - poll for export completion then initiate export.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<ExportToTerraResponse>}
     */
    public exportToTerra(searchTerms: SearchTerm[]): Observable<ExportToTerraResponse> {

        // Set up polling for export completion - if export request is still in progress, continue to poll. Otherwise
        // kill polling subscription and return export URL.
        const exportResponse$ = new Subject<ExportToTerraResponse>();
        exportResponse$.subscribe((response: ExportToTerraResponse) => {

            if ( response.status === ExportToTerraStatus.IN_PROGRESS ) {
                return this.updateExportToTerraStatus(response, exportResponse$);
            }

            exportResponse$.unsubscribe();
        });

        const query = new ICGCQuery(this.fileHttpService.marshallSelectedFacets(searchTerms), "bdbag");
        let params = new HttpParams({fromObject: query} as any);

        const url = this.buildApiUrl(`/fetch/manifest/files`);
        const getRequest = this.httpClient.get<ExportToTerraHttpResponse>(url, {params});
        this.requestExportToTerra(getRequest, exportResponse$);

        return exportResponse$.asObservable();
    }

    /**
     * Normalize export to Terra HTTP response to FE-friendly format.
     *
     * @param {ExportToTerraHttpResponse} response
     * @returns {ExportToTerraResponse}
     */
    private bindExportToTerraResponse(response: ExportToTerraHttpResponse): Observable<ExportToTerraResponse> {

        return of({
            retryAfter: response["Retry-After"],
            status: this.translateExportToTerraStatus(response.Status),
            url: response.Location
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
     * An error occurred during a export to Terra request - return error state.
     *
     * @returns {ExportToTerraResponse}
     */
    private handleExportToTerraError(): Observable<ExportToTerraResponse> {

        return of({
            retryAfter: 0,
            status: ExportToTerraStatus.FAILED,
            url: ""
        });
    }

    /**
     * Request export to Terra status for the specified URL.
     *
     * @param {Observable<ExportToTerraHttpResponse>} getRequest
     * @param {ExportToTerraResponse} terraResponse
     */
    private requestExportToTerra(getRequest: Observable<ExportToTerraHttpResponse>,  terraResponse: Subject<ExportToTerraResponse>) {

        getRequest
            .pipe(
                retry(3),
                catchError(this.handleExportToTerraError.bind(this)),
                switchMap(this.bindExportToTerraResponse.bind(this))
            )
            .subscribe((response: ExportToTerraResponse) => {
                terraResponse.next(response);
            });
    }

    /**
     * Send request to export to Terra and poll for completion.
     *
     * @param {ExportToTerraResponse} response
     * @param {Subject<ExportToTerraResponse>} exportResponse$
     */
    private updateExportToTerraStatus(response: ExportToTerraResponse, exportResponse$: Subject<ExportToTerraResponse>) {

        interval(response.retryAfter * 1000)
            .pipe(
                take(1)
            )
            .subscribe(() => {
                const getRequest = this.httpClient.get<ExportToTerraHttpResponse>(response.url);
                this.requestExportToTerra(getRequest, exportResponse$);
            });
    }

    /**
     * Convert the value of the export to Terra status to FE-friendly value.
     *
     * @param {number} code
     * @returns {ExportToTerraStatus}
     */
    private translateExportToTerraStatus(code: number): ExportToTerraStatus {

        if ( code === 301 ) {
            return ExportToTerraStatus.IN_PROGRESS;
        }
        if ( code === 302 ) {
            return ExportToTerraStatus.COMPLETE;
        }
        return ExportToTerraStatus.FAILED;
    }
}
