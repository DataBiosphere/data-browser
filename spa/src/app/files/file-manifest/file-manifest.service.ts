/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating file manifest-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { interval, Observable, of, Subject } from "rxjs";
import { catchError, retry, switchMap, take, takeUntil } from "rxjs/operators";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FileSummary } from "../file-summary/file-summary";
import { FilesService } from "../shared/files.service";
import { ICGCQuery } from "../shared/icgc-query";
import { ManifestDownloadFormat } from "./manifest-download-format.model";
import { ManifestResponse } from "./manifest-response.model";
import { ManifestStatus } from "./manifest-status.model";
import { ManifestHttpResponse } from "./manifest-http-response.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchFacetTerm } from "../search/search-facet-term.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";

@Injectable()
export class FileManifestService {

    /**
     * @param {ConfigService} configService
     * @param {FilesService} filesService
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {HttpClient} httpClient
     *
     */
    constructor(private configService: ConfigService,
                private filesService: FilesService,
                private searchTermHttpService: SearchTermHttpService,
                private httpClient: HttpClient) {
    }

    /**
     * Build up set of search terms for manifest-related requests. If not file format is currently selected in the set
     * of search terms, add all file types.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormat
     * @returns {SearchTerm[]}
     */
    public buildManifestSearchTerms(searchTerms: SearchTerm[], fileFormat: FileFacet): SearchTerm[] {

        // If there are currently no selected file format, add all file formats.
        return this.isAnyFileFormatSelected(searchTerms) ?
            searchTerms :
            this.addAllFileFormatsToSearchTerms(searchTerms, fileFormat);
    }

    /**
     * Request file manifest.
     * 
     * @param {Catalog} catalog
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormats
     * @param {ManifestDownloadFormat} manifestFormat
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<ManifestResponse>}
     */
    public requestFileManifestUrl(catalog: Catalog, 
                                  searchTerms: SearchTerm[], 
                                  fileFormats: FileFacet,
                                  manifestFormat: ManifestDownloadFormat,
                                  killSwitch$: Observable<boolean>): Observable<ManifestResponse> {

        const manifestSearchTerms = this.buildManifestSearchTerms(searchTerms, fileFormats);
        return this.sendFileManifestUrlRequest(catalog, manifestSearchTerms, manifestFormat, killSwitch$);
    }

    /**
     * Fetch file summary for displaying the manifest modal, passing in the current set of selected facets except any
     * selected file types.
     *
     * @param {Catalog} catalog
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<FileSummary>}
     */
    public fetchFileManifestFileSummary(catalog: Catalog, searchTerms: SearchTerm[]): Observable<FileSummary> {

        const searchTermsExceptFileTypes = searchTerms.filter((searchTerm) => {
            return searchTerm.getSearchKey() !== FileFacetName.FILE_FORMAT;
        });
        return this.filesService.fetchFileSummary(catalog, searchTermsExceptFileTypes);
    }

    /**
     * Add all file formats to the set of search terms. When no file formats are currently selected in the set of
     * search terms, we must convert this to all file formats.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormat
     * @returns {SearchTerm[]}
     */
    private addAllFileFormatsToSearchTerms(searchTerms: SearchTerm[], fileFormat: FileFacet): SearchTerm[] {

        const searchTermsClone = [...searchTerms];
        fileFormat.terms.forEach((term) =>
            searchTermsClone.push(new SearchFacetTerm(fileFormat.name, term.name)));
        return searchTermsClone;
    }

    /**
     * Normalize download HTTP response to FE-friendly format.
     *
     * @param {ManifestHttpResponse} response
     * @returns {ManifestResponse}
     */
    private bindManifestResponse(response: ManifestHttpResponse): Observable<ManifestResponse> {

        return of({
            commandLine: response.CommandLine,
            fileUrl: response.Location,
            retryAfter: response["Retry-After"],
            status: this.translateFileDownloadStatus(response.Status)
        });
    }

    /**
     * An error occurred during a request for file manifest URL - return error state.
     *
     * @returns {ManifestResponse}
     */
    private handleManifestError(): Observable<ManifestResponse> {

        return of({
            status: ManifestStatus.FAILED,
            fileUrl: "",
            retryAfter: 0
        });
    }

    /**
     * Send HTTP request for file manifest URL, and set up polling to monitor status.
     * 
     * @param {Catalog} catalog
     * @param {SearchTerm[]} searchTerms
     * @param {ManifestDownloadFormat} manifestFormat
     * @param killSwitch$
     * @returns {Observable<ManifestResponse>}
     */
    private sendFileManifestUrlRequest(catalog: Catalog,
                                       searchTerms: SearchTerm[],
                                       manifestFormat: ManifestDownloadFormat,
                                       killSwitch$): Observable<ManifestResponse> {

        const manifestResponse$ = new Subject<ManifestResponse>();

        const query =
            new ICGCQuery(catalog, this.searchTermHttpService.marshallSearchTerms(searchTerms), manifestFormat);
        let params = new HttpParams({fromObject: query} as any);
        const url = this.configService.getFileManifestUrl();
        this.pollRequestFileManifest(url, params, 0, manifestResponse$, killSwitch$);

        return manifestResponse$.asObservable();
    }

    /**
     * Returns true if there if any file format is in the current set of selected search terms.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {boolean}
     */
    private isAnyFileFormatSelected(searchTerms: SearchTerm[]): boolean {

        return searchTerms.some((searchTerm) =>
            searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT);
    }

    /**
     * Poll file manifest status until no longer in progress, updating the manifest response on each poll. Kill polling
     * if indicated by kill switch.
     *
     * @param {string} url
     * @param {HttpParams} params
     * @param {number} delay
     * @param {Subject<ManifestResponse>} manifestResponse$
     * @param {Observable<boolean>} killSwitch$
     */
    private pollRequestFileManifest(
        url: string, params: HttpParams, delay: number, manifestResponse$: Subject<ManifestResponse>, killSwitch$: Observable<boolean>) {

        const subscription = interval(delay * 1000)
            .pipe(
                take(1),
                switchMap(() => {

                    return this.httpClient.get<ManifestHttpResponse>(url, params ? {params} : {})
                        .pipe(
                            retry(2),
                            catchError(this.handleManifestError.bind(this)),
                            switchMap(this.bindManifestResponse.bind(this))
                        );
                }),
                takeUntil(killSwitch$)
            )
            .subscribe((response: ManifestResponse) => {

                // Let listeners know the latest status
                manifestResponse$.next(response);

                // If the request is still in progress, poll again for status
                if ( response.status === ManifestStatus.IN_PROGRESS ) {
                    this.pollRequestFileManifest(response.fileUrl, null, response.retryAfter, manifestResponse$, killSwitch$)
                }

                // Clean up each loop through the poll
                subscription.unsubscribe();
            })
    }

    /**
     * Convert the value of the file download status to FE-friendly value.
     *
     * @param {number} code
     * @returns {ManifestStatus}
     */
    private translateFileDownloadStatus(code: number): ManifestStatus {

        if ( code === 301 ) {
            return ManifestStatus.IN_PROGRESS;
        }
        if ( code === 302 ) {
            return ManifestStatus.COMPLETE;
        }
        return ManifestStatus.FAILED;
    }
}
