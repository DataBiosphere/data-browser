/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating Terra-related functionality.
 */

// Core dependencies
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Observable, of, Subject } from "rxjs";
import { catchError, retry, switchMap, take, takeUntil } from "rxjs/operators";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { ExportToTerraResponse } from "./export-to-terra-response.model";
import { ExportToTerraStatus } from "./export-to-terra-status.model";
import { ExportToTerraHttpResponse } from "./export-to-terra-http-response.model";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { FileManifestService } from "../file-manifest/file-manifest.service";
import { ManifestDownloadFormat } from "../file-manifest/manifest-download-format.model";
import { ICGCQuery } from "./icgc-query";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";

@Injectable()
export class TerraService {
    /**
     * @param {ConfigService} configService
     * @param {FileManifestService} fileManifestService
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {HttpClient} httpClient
     */
    constructor(
        private configService: ConfigService,
        private fileManifestService: FileManifestService,
        private searchTermHttpService: SearchTermHttpService,
        private httpClient: HttpClient
    ) {}

    /**
     * Build up the complete export to Terra URL, for opening a Terra workspace in a new tab.
     *
     * @param {ManifestDownloadFormat} format
     * @param {string} exportUrl
     * @returns {string}
     */
    public buildExportToTerraWorkspaceUrl(
        format: ManifestDownloadFormat,
        exportUrl: string
    ): string {
        const encodedExportUrl = encodeURIComponent(exportUrl);
        return this.configService.getTerraRedirectUrl(format, encodedExportUrl);
    }

    /**
     * Returns true if the specified export to Terra request has been completed.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestComplete(
        status: ExportToTerraStatus
    ): boolean {
        return status === ExportToTerraStatus.COMPLETE;
    }

    /**
     * Returns true if the specified export to Terra request has failed.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestFailed(status: ExportToTerraStatus): boolean {
        return status === ExportToTerraStatus.FAILED;
    }

    /**
     * Returns true if the specified export to Terra request has been initiated.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestInitiated(
        status: ExportToTerraStatus
    ): boolean {
        return status === ExportToTerraStatus.INITIATED;
    }

    /**
     * Returns true if the specified export to Terra request is in progress.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestInProgress(
        status: ExportToTerraStatus
    ): boolean {
        return status === ExportToTerraStatus.IN_PROGRESS;
    }

    /**
     * Returns true if the specified export to Terra request has not yet been initiated.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestNotStarted(
        status: ExportToTerraStatus
    ): boolean {
        return status === ExportToTerraStatus.NOT_STARTED;
    }

    /**
     * Export current state of selected facets to Terra.
     *
     * @param {Catalog} catalog
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormats
     * @param {ManifestDownloadFormat} manifestDownloadFormat
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<ExportToTerraResponse>}
     */
    public exportToTerra(
        catalog: Catalog,
        searchTerms: SearchTerm[],
        fileFormats: FileFacet,
        manifestDownloadFormat: ManifestDownloadFormat,
        killSwitch$: Observable<boolean>
    ): Observable<ExportToTerraResponse> {
        const manifestSearchTerms =
            this.fileManifestService.buildManifestSearchTerms(
                searchTerms,
                fileFormats
            );

        // Set up polling for export completion - if export request is still in progress, continue to poll. Otherwise
        // kill polling subscription and return export URL.
        const exportResponse$ = new Subject<ExportToTerraResponse>();
        exportResponse$.subscribe((response: ExportToTerraResponse) => {
            if (response.status === ExportToTerraStatus.IN_PROGRESS) {
                return this.updateExportToTerraStatus(
                    response,
                    exportResponse$,
                    killSwitch$
                );
            }

            exportResponse$.unsubscribe();
        });

        const query = new ICGCQuery(
            catalog,
            this.searchTermHttpService.marshallSearchTerms(searchTerms),
            manifestDownloadFormat
        );
        let params = new HttpParams({ fromObject: query } as any);
        const url = this.configService.getFileManifestUrl();
        const getRequest = this.httpClient.get<ExportToTerraHttpResponse>(url, {
            params,
        });
        this.requestExportToTerra(getRequest, exportResponse$, killSwitch$);

        return exportResponse$.asObservable();
    }

    /**
     * Normalize export to Terra HTTP response to FE-friendly format.
     *
     * @param {ExportToTerraHttpResponse} response
     * @returns {ExportToTerraResponse}
     */
    private bindExportToTerraResponse(
        response: ExportToTerraHttpResponse
    ): Observable<ExportToTerraResponse> {
        return of({
            retryAfter: response["Retry-After"],
            status: this.translateExportToTerraStatus(response.Status),
            url: response.Location,
        });
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
            url: "",
        });
    }

    /**
     * Request export to Terra status for the specified URL.
     *
     * @param {Observable<ExportToTerraHttpResponse>} getRequest
     * @param {ExportToTerraResponse} terraResponse
     * @param {Observable<boolean>} killSwitch$
     */
    private requestExportToTerra(
        getRequest: Observable<ExportToTerraHttpResponse>,
        terraResponse: Subject<ExportToTerraResponse>,
        killSwitch$: Observable<boolean>
    ) {
        getRequest
            .pipe(
                retry(3),
                catchError(this.handleExportToTerraError.bind(this)),
                switchMap(this.bindExportToTerraResponse.bind(this)),
                takeUntil(killSwitch$)
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
     * @param {Observable<boolean>} killSwitch$
     */
    private updateExportToTerraStatus(
        response: ExportToTerraResponse,
        exportResponse$: Subject<ExportToTerraResponse>,
        killSwitch$: Observable<boolean>
    ) {
        interval(response.retryAfter * 1000)
            .pipe(take(1))
            .subscribe(() => {
                const getRequest =
                    this.httpClient.get<ExportToTerraHttpResponse>(
                        response.url
                    );
                this.requestExportToTerra(
                    getRequest,
                    exportResponse$,
                    killSwitch$
                );
            });
    }

    /**
     * Convert the value of the export to Terra status to FE-friendly value.
     *
     * @param {number} code
     * @returns {ExportToTerraStatus}
     */
    private translateExportToTerraStatus(code: number): ExportToTerraStatus {
        if (code === 301) {
            return ExportToTerraStatus.IN_PROGRESS;
        }
        if (code === 302) {
            return ExportToTerraStatus.COMPLETE;
        }
        return ExportToTerraStatus.FAILED;
    }
}
