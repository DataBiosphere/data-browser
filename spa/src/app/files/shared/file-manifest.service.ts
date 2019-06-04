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
import { catchError, retry, switchMap, take } from "rxjs/operators";

// App dependencies
import { Dictionary } from "../../dictionary";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFormat } from "./file-format.model";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileSummary } from "../file-summary/file-summary";
import { FilesService } from "./files.service";
import { ManifestResponse } from "./manifest-response.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";
import { ManifestHttpResponse } from "./manifest-http-response.model";
import { ManifestStatus } from "./manifest-status.model";
import { ConfigService } from "../../config/config.service";
import { SearchTermDAO } from "./search-term.dao";
import { ICGCQuery } from "./icgc-query";
import { ManifestDownloadFormat } from "./manifest-download-format.model";

@Injectable()
export class FileManifestService {

    /**
     * @param {ConfigService} configService
     * @param {FilesService} filesService
     * @param {SearchTermDAO} searchTermDAO
     * @param {HttpClient} httpClient
     * 
     */
    constructor(private configService: ConfigService,
                private filesService: FilesService,
                private searchTermDAO: SearchTermDAO,
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
        const searchTermsWithFileFormats = this.isAnyFileFormatSelected(searchTerms) ?
            searchTerms :
            this.addAllFileFormatsToSearchTerms(searchTerms, fileFormat);

        // Remove matrix file format
        return this.removeMatrixFileFormat(searchTermsWithFileFormats);
    }

    /**
     * Download file manifest. Removes "matrix" search term, if selected.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormats
     * @returns {Observable<ManifestResponse>}
     */
    public downloadFileManifest(searchTerms: SearchTerm[], fileFormats: FileFacet): Observable<ManifestResponse> {

        const manifestSearchTerms = this.buildManifestSearchTerms(searchTerms, fileFormats);

        // Set up polling for file download completion - if file download request is still in progress, continue to
        // poll. Otherwise kill polling subscription.
        const manifestResponse$ = new Subject<ManifestResponse>();
        manifestResponse$.subscribe((response: ManifestResponse) => {

            if ( response.status === ManifestStatus.IN_PROGRESS ) {
                return this.updateManifestStatus(response, manifestResponse$);
            }

            manifestResponse$.unsubscribe();
        });

        const query = new ICGCQuery(this.searchTermDAO.marshallSearchTerms(searchTerms), ManifestDownloadFormat.TSV);
        let params = new HttpParams({fromObject: query} as any);

        const url = this.buildApiUrl(`/fetch/manifest/files`);
        const getRequest = this.httpClient.get<ManifestHttpResponse>(url, {params});
        this.requestManifest(getRequest, manifestResponse$);

        return manifestResponse$.asObservable();
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<Dictionary<FileManifestSummary>>}
     */
    public fetchFileManifestSummary(searchTerms: SearchTerm[]): Observable<Dictionary<FileManifestSummary>> {

        const query = new ICGCQuery(this.searchTermDAO.marshallSearchTerms(searchTerms));

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

        const url = this.buildApiUrl("/repository/files/summary/manifest");

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
     * An error occurred during a file download - return error state.
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
     * Returns true if there if any file format is in the current set of selected search terms, excluding "matrix", as
     * this is not a valid file format when requesting a manifest.
     * 
     * @param {SearchTerm[]} searchTerms
     * @returns {boolean}
     */
    private isAnyFileFormatSelected(searchTerms: SearchTerm[]): boolean {

        return searchTerms.some((searchTerm) =>
            searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT &&
            searchTerm.getSearchValue() !== FileFormat.MATRIX);
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
     * Request manifest download status for the specified URL.
     *
     * @param {Observable<ManifestHttpResponse>} getRequest
     */
    private requestManifest(getRequest: Observable<ManifestHttpResponse>,  manifestResponse$: Subject<ManifestResponse>) {

        getRequest
            .pipe(
                retry(3),
                catchError(this.handleManifestError.bind(this)),
                switchMap(this.bindManifestResponse.bind(this))
            )
            .subscribe((response: ManifestResponse) => {
                manifestResponse$.next(response);
            });
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

    /**
     * Send request to download manifest and poll for completion.
     *
     * @param {ManifestResponse} response
     * @param {Subject<ManifestResponse>} manifestResponse$
     */
    private updateManifestStatus(response: ManifestResponse, manifestResponse$: Subject<ManifestResponse>) {


        interval(response.retryAfter * 1000)
            .pipe(
                take(1)
            )
            .subscribe(() => {
                const getRequest = this.httpClient.get<ManifestHttpResponse>(response.fileUrl);
                this.requestManifest(getRequest, manifestResponse$);
            });
    }
}
