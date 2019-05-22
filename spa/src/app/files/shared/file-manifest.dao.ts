/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Data access object, connecting to file manifest-related end points.
 */

// Core dependencies
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Observable, of, Subject } from "rxjs";
import { catchError, retry, switchMap, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Dictionary } from "../../dictionary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { ICGCQuery } from "./icgc-query";
import { ManifestDownloadFormat } from "./manifest-download-format.model";
import { ManifestResponse } from "./manifest-response.model";
import { ManifestStatus } from "./manifest-status.model";
import { ManifestHttpResponse } from "./manifest-http-response.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermDAO } from "./search-term.dao";

@Injectable()
export class FileManifestDAO {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermDAO} searchTermDAO
     * @param {HttpClient} httpClient
     */
    constructor(
        private configService: ConfigService,
        private searchTermDAO: SearchTermDAO,
        private httpClient: HttpClient) {}

    /**
     * Fetch manifest summary
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<FileManifestSummary>}
     */
    fetchFileManifestSummary(searchTerms: SearchTerm[]): Observable<Dictionary<FileManifestSummary>> {

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
     * Download manifest - poll for manifest completion then initiate download.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<ManifestResponse>}
     */
    public downloadFileManifest(searchTerms: SearchTerm[]): Observable<ManifestResponse> {

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
     * Privates
     */

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
