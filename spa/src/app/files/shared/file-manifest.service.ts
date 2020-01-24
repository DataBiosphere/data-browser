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
import { ConfigService } from "../../config/config.service";
import { Dictionary } from "../../dictionary";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFormat } from "./file-format.model";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileSummary } from "../file-summary/file-summary";
import { FilesService } from "./files.service";
import { ICGCQuery } from "./icgc-query";
import { ManifestDownloadFormat } from "./manifest-download-format.model";
import { ManifestResponse } from "./manifest-response.model";
import { ManifestStatus } from "./manifest-status.model";
import { ManifestHttpResponse } from "./manifest-http-response.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";
import { SearchTermService } from "./search-term.service";

@Injectable()
export class FileManifestService {

    /**
     * @param {ConfigService} configService
     * @param {FilesService} filesService
     * @param {SearchTermService} searchTermService
     * @param {HttpClient} httpClient
     *
     */
    constructor(private configService: ConfigService,
                private filesService: FilesService,
                private searchTermService: SearchTermService,
                private httpClient: HttpClient) {
    }

    /**
     * Build up set of search terms for manifest-related requests. If not file format is currently selected in the set
     * of search terms, add all file types. Always remove file type of "matrix".
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
     * Request file manifest. Removes "matrix" search term, if selected.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormats
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<ManifestResponse>}
     */
    public requestFileManifestUrl(
        searchTerms: SearchTerm[], fileFormats: FileFacet, killSwitch$: Observable<boolean>): Observable<ManifestResponse> {

        const manifestSearchTerms = this.buildManifestSearchTerms(searchTerms, fileFormats);
        return this.sendFileManifestUrlRequest(manifestSearchTerms, killSwitch$);
    }

    /**
     * Get the file manifest URL for generating a matrix request.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<ManifestResponse>}
     *
     */
    public requestMatrixFileManifestUrl(searchTerms: SearchTerm[], killSwitch$: Observable<boolean>): Observable<ManifestResponse> {

        return this.sendFileManifestUrlRequest(searchTerms, killSwitch$);
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<Dictionary<FileManifestSummary>>}
     */
    public fetchFileManifestSummary(searchTerms: SearchTerm[]): Observable<Dictionary<FileManifestSummary>> {

        const query = new ICGCQuery(this.searchTermService.marshallSearchTerms(searchTerms));

        const filters = JSON.parse(query.filters);
        let repoNames = []; // TODO empty array default throws an error. There needs to be something in the repoNames

        if ( filters.file && filters.file.repoName ) {
            repoNames = filters.file.repoName.is;
        }

        // convert query from string back to object for post
        const form = Object.assign({}, {
            query: {
                filters: JSON.parse(query.filters)
            },
            repoNames: repoNames
        });

        const url = this.configService.buildApiUrl("/repository/files/summary/manifest");

        return this.httpClient.post<Dictionary<FileManifestSummary>>(url, form);
    }

    /**
     * Fetch file summary for displaying the manifest modal, passing in the current set of selected facets except any
     * selected file types.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<FileSummary>}
     */
    public fetchFileManifestFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        const searchTermsExceptFileTypes = searchTerms.filter((searchTerm) => {
            return searchTerm.getSearchKey() !== FileFacetName.FILE_FORMAT;
        });
        return this.filesService.fetchFileSummary(searchTermsExceptFileTypes);
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
            searchTermsClone.push(new SearchFileFacetTerm(fileFormat.name, term.name)));
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
     * @param {SearchTerm[]} searchTerms
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<ManifestResponse>}
     */
    private sendFileManifestUrlRequest(searchTerms: SearchTerm[], killSwitch$): Observable<ManifestResponse> {

        const manifestResponse$ = new Subject<ManifestResponse>();

        const query = new ICGCQuery(this.searchTermService.marshallSearchTerms(searchTerms), ManifestDownloadFormat.COMPACT);
        let params = new HttpParams({fromObject: query} as any);
        const url = this.configService.buildApiUrl(`/fetch/manifest/files`);
        this.pollRequestFileManifest(url, params, 0, manifestResponse$, killSwitch$);

        return manifestResponse$.asObservable();
    }

    /**
     * Returns true if there if any file format is in the current set of selected search terms, excluding "matrix", as
     * this is not a valid file format when requesting a manifest.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {boolean}
     */
    private isAnyFileFormatSelected(searchTerms: SearchTerm[]): boolean {

        return searchTerms.some((searchTerm) =>
            searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT);
    }

    /**
     * Remove matrix file format from the set of file formats, if specified.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {SearchTerm[]}
     */
    private removeMatrixFileFormat(searchTerms: SearchTerm[]): SearchTerm[] {

        return searchTerms.reduce((accum, searchTerm) => {

            if ( !(searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT &&
                searchTerm.getSearchValue() === FileFormat.MATRIX) ) {
                accum.push(searchTerm);
            }
            return accum;
        }, []);
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
