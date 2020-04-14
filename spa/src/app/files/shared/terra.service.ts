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
import { catchError, retry, switchMap, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { ExportToTerraResponse } from "./export-to-terra-response.model";
import { ExportToTerraStatus } from "./export-to-terra-status.model";
import { ExportToTerraHttpResponse } from "./export-to-terra-http-response.model";
import { FileFacet } from "./file-facet.model";
import { FileManifestService } from "./file-manifest.service";
import { ICGCQuery } from "./icgc-query";
import { ManifestDownloadFormat } from "./manifest-download-format.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermService } from "./search-term.service";
import { ToolName } from "./tool-name.model";
import { GACategory } from "../../shared/gtm/ga-category.model";
import { GADimension } from "../../shared/gtm/ga-dimension.model";
import { GAAction } from "../../shared/gtm/ga-action.model";
import { GTMService } from "../../shared/gtm/gtm.service";
import { GAEntityType } from "../../shared/gtm/ga-entity-type.model";

@Injectable()
export class TerraService {

    /**
     * @param {ConfigService} configService
     * @param {FileManifestService} fileManifestService
     * @param {GTMService} gtmService
     * @param {SearchTermService} searchTermService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private fileManifestService: FileManifestService,
                private gtmService: GTMService,
                private searchTermService: SearchTermService,
                private httpClient: HttpClient) {
    }

    /**
     * Build up the complete export to Terra URL, for opening a Terra workspace in a new tab.
     *
     * @param {string} exportUrl
     * @returns {string}
     */
    public buildExportToTerraWorkspaceUrl(exportUrl: string): string {

        const encdodedUrl = encodeURIComponent(exportUrl);
        return `https://app.terra.bio/#import-data?url=${encdodedUrl}`;
    }

    /**
     * Returns true if the specified export to Terra request has been completed.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestComplete(status: ExportToTerraStatus): boolean {

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
    public isExportToTerraRequestInitiated(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.INITIATED;
    }

    /**
     * Returns true if the specified export to Terra request is in progress.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestInProgress(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.IN_PROGRESS;
    }

    /**
     * Returns true if the specified export to Terra request has not yet been initiated.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestNotStarted(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.NOT_STARTED;
    }

    /**
     * Export current state of selected facets to Terra.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormats
     * @returns {Observable<ExportToTerraResponse>}
     */
    public exportToTerra(searchTerms: SearchTerm[], fileFormats: FileFacet): Observable<ExportToTerraResponse> {

        const manifestSearchTerms = this.fileManifestService.buildManifestSearchTerms(searchTerms, fileFormats);

        // Set up polling for export completion - if export request is still in progress, continue to poll. Otherwise
        // kill polling subscription and return export URL.
        const exportResponse$ = new Subject<ExportToTerraResponse>();
        exportResponse$.subscribe((response: ExportToTerraResponse) => {

            if ( response.status === ExportToTerraStatus.IN_PROGRESS ) {
                return this.updateExportToTerraStatus(response, exportResponse$);
            }

            exportResponse$.unsubscribe();
        });

        const query = new ICGCQuery(this.searchTermService.marshallSearchTerms(searchTerms), ManifestDownloadFormat.TERRA_BDBAG);
        let params = new HttpParams({fromObject: query} as any);

        const url = this.configService.buildApiUrl(`/fetch/manifest/files`);
        const getRequest = this.httpClient.get<ExportToTerraHttpResponse>(url, {params});
        this.requestExportToTerra(getRequest, exportResponse$);

        return exportResponse$.asObservable();
    }

    /**
     * Build up and send GTM event to track a export to Terra request.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     */
    public trackRequestExportToTerra(selectedSearchTerms: SearchTerm[]) {

        const query = this.searchTermService.marshallSearchTerms(selectedSearchTerms);
        this.gtmService.trackEvent(GACategory.EXPORT, GAAction.REQUEST, query, {
            [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_EXPORT,
            [GADimension.TOOL_NAME]: ToolName.TERRA
        });
    }

    /**
     * Track click on generated Terra link (that opens the Terra workspace).
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} exportToTerraUrl
     */
    public trackLaunchTerraLink(selectedSearchTerms: SearchTerm[], exportToTerraUrl: string) {

        const query = this.searchTermService.marshallSearchTerms(selectedSearchTerms);
        this.gtmService.trackEvent(GACategory.EXPORT, GAAction.LAUNCH, query, {
            [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_EXPORT_LINK,
            [GADimension.ENTITY_URL]: exportToTerraUrl,
            [GADimension.TOOL_NAME]: ToolName.TERRA
        });
    }

    /**
     * Track click on copy to clipboard of the generated Terra link (that opens the Terra workspace).
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} exportToTerraUrl
     */
    public trackCopyToClipboardTerraLink(selectedSearchTerms: SearchTerm[], exportToTerraUrl: string) {

        const query = this.searchTermService.marshallSearchTerms(selectedSearchTerms);
        this.gtmService.trackEvent(GACategory.EXPORT, GAAction.COPY_TO_CLIPBOARD, query, {
            [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_EXPORT_LINK,
            [GADimension.ENTITY_URL]: exportToTerraUrl,
            [GADimension.TOOL_NAME]: ToolName.TERRA
        });
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
