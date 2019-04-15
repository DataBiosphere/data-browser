/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Data access object, connecting to file-related end points.
 */

// Core dependencies
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { interval, Observable, of, Subject } from "rxjs";
import { catchError, map, retry, switchMap, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Dictionary } from "../../dictionary";
import { EntitySearchResults } from "./entity-search-results.model";
import { FacetTermsResponse } from "./facet-terms-response.model";
import { FileSummary } from "../file-summary/file-summary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FilesAPIResponse } from "./files-api-response.model";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { ICGCQuery } from "./icgc-query";
import { ManifestDownloadFormat } from "./manifest-download-format.model";
import { ManifestResponse } from "./manifest-response.model";
import { ManifestStatus } from "./manifest-status.model";
import { ManifestHttpResponse } from "./manifest-http-response.model";
import { SearchTerm } from "../search/search-term.model";
import { TableParamsModel } from "../table/table-params.model";
import { Term } from "./term.model";

@Injectable()
export class FilesDAO {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {}

    /**
     * Fetch file summary.
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<FileSummary>}
     */
    fetchFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        // Build up API URL
        const url = this.buildApiUrl(`/repository/summary`);

        // Build up the query params
        const filters = this.searchTermsToQueryString(searchTerms);

        return this.httpClient.get<FileSummary>(url, {
            params: {
                filters
            }
        });
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg projects, specimens, files), as
     * well as facet terms and their corresponding counts. When viewing the project tables, we want to remove any
     * selected projects facets as we do not want to restrict the table result set to just the selected projects. That is,
     * projects tab is not filterable by project.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    fetchEntitySearchResults(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>,
        tableParams: TableParamsModel,
        selectedEntity: string,
        filterableByProject: boolean): Observable<EntitySearchResults> {

        // Build API URL
        const url = this.buildApiUrl(`/repository/` + selectedEntity);

        // Build up param map
        let paramMap;
        if ( filterableByProject ) {
            paramMap = this.buildFetchSearchResultsQueryParams(searchTermsByFacetName, tableParams);
        }
        else {
            const filteredSearchTerms = this.removeProjectSearchTerms(searchTermsByFacetName, selectedEntity);
            paramMap = this.buildFetchSearchResultsQueryParams(filteredSearchTerms, tableParams);
        }

        return this.httpClient
            .get<FilesAPIResponse>(url, {params: paramMap})
            .pipe(
                map((repositoryFiles: FilesAPIResponse) => {

                    const fileFacets = this.createFileFacets(searchTermsByFacetName, repositoryFiles);
                    const termCountsByFacetName = this.mapTermCountsByFacetName(fileFacets);

                    const tableModel = {
                        data: repositoryFiles.hits,
                        pagination: repositoryFiles.pagination,
                        tableName: selectedEntity,
                        termCountsByFacetName
                    };

                    return {
                        fileFacets,
                        tableModel
                    };
                })
            );
    }

    /**
     * Fetch manifest summary
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<FileManifestSummary>}
     */
    fetchFileManifestSummary(searchTerms: SearchTerm[]): Observable<Dictionary<FileManifestSummary>> {

        const query = new ICGCQuery(this.searchTermsToQueryString(searchTerms));

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
     * @returns {any}
     */
    public downloadFileManifest(searchTerms: SearchTerm[]): Observable<ManifestResponse> {

        // Set up polling for file download completion - if file download request is still in progress, continue to
        // poll. Otherwise kill polling subscription and download file.
        const manifestResponse$ = new Subject<ManifestResponse>();
        manifestResponse$.subscribe((response: ManifestResponse) => {

            if ( response.status === ManifestStatus.IN_PROGRESS ) {
                return this.updateManifestStatus(response, manifestResponse$);
            }

            manifestResponse$.unsubscribe();

            if ( response.status === ManifestStatus.COMPLETE ) {
                window.location.href = response.fileUrl;
            }
        });

        const query = new ICGCQuery(this.searchTermsToQueryString(searchTerms), ManifestDownloadFormat.TSV);
        let params = new HttpParams({fromObject: query} as any);

        const url = this.buildApiUrl(`/fetch/manifest/files`);
        const getRequest = this.httpClient.get<ManifestHttpResponse>(url, {params});
        this.requestManifest(getRequest, manifestResponse$);

        return manifestResponse$.asObservable();
    }

    /**
     * Build the manifest download URL - required for requesting a Matrix export.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {string} format
     * @returns {string}
     */
    public buildMatrixManifestUrl(searchTerms: SearchTerm[], format?: string): string {

        const query = new ICGCQuery(this.searchTermsToQueryString(searchTerms), format);

        let params = new URLSearchParams();
        Object.keys(query).forEach((paramName) => {
            params.append(paramName, query[paramName]);
        });

        return this.buildApiUrl(`/manifest/files?${params.toString()}`);
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
     * Build up set of query params for fetching search results.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {TableParamsModel} tableParams
     */
    private buildFetchSearchResultsQueryParams(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>, tableParams: TableParamsModel) {

        // Build query params
        const searchTermSets = searchTermsByFacetName.values();
        const searchTerms = Array.from(searchTermSets).reduce((accum, searchTermSet) => {
            return accum.concat(Array.from(searchTermSet));
        }, []);
        const filters = this.searchTermsToQueryString(searchTerms);

        const paramMap = {
            filters,
            size: tableParams.size.toString(10)
        };

        if ( tableParams.sort && tableParams.order ) {
            paramMap["sort"] = tableParams.sort;
            paramMap["order"] = tableParams.order;
        }

        // check if there is paging
        if ( tableParams.search_after && tableParams.search_after_uid ) {

            paramMap["search_after"] = tableParams.search_after;
            paramMap["search_after_uid"] = tableParams.search_after_uid;
        }

        if ( tableParams.search_before && tableParams.search_before_uid ) {

            paramMap["search_before"] = tableParams.search_before;
            paramMap["search_before_uid"] = tableParams.search_before_uid;
        }

        return paramMap;
    }

    /**
     * Map files API response into FileFacet objects, maintaining selected state of terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {FilesAPIResponse} filesAPIResponse
     * @returns {FileFacet[]}
     */
    private createFileFacets(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>,
        filesAPIResponse: FilesAPIResponse): FileFacet[] {

        // Determine the set of facets that are to be displayed
        const visibleFacets = Object.assign({}, filesAPIResponse.termFacets);

        // Calculate the number of terms to display on each facet card
        const shortListLength = this.calculateShortListLength(visibleFacets);

        const facetNames = Object.keys(visibleFacets);
        const newFileFacets = facetNames.map((facetName) => {

            const responseFileFacet = visibleFacets[facetName];
            const searchTermSet: Set<SearchTerm> = searchTermsByFacetName.get(facetName);
            let searchTerms = searchTermSet ?
                Array.from(searchTermSet.values()).map((searchTerm) => searchTerm.name) :
                [];

            let responseTerms: Term[] = [];

            // the response from ICGC is missing the terms field instead of being an empty array
            // we need to check it's existence before iterating over it.
            if ( responseFileFacet.terms ) {

                // Create term from response, maintaining the currently selected term.
                responseTerms = responseFileFacet.terms.map((responseTerm) => {

                    if ( responseTerm.term == null ) {
                        responseTerm.term = "Unspecified";
                    }

                    let selected = searchTerms.indexOf(responseTerm.term) >= 0;
                    return new Term(responseTerm.term, responseTerm.count, selected, "000000");
                });
            }

            if ( !responseFileFacet.total ) {
                responseFileFacet.total = 0; // their default is undefined instead of zero
            }

            // Create file facet from newly built terms and newly calculated total
            return new FileFacet(facetName, responseFileFacet.total, responseTerms, shortListLength);
        });

        return newFileFacets;
    }

    /**
     * Calculate the maximum number of terms to display inside a facet card. Determine term count mode across all
     * facets. If mode + 1 is less than 5, maximum number of terms if 5. Is mode + 1 is more than 10, maximum number of
     * terms is 10. Otherwise, use the mode + 1 as the maximum number of terms.
     *
     * @param facetTermsResponse {Dictionary<FacetTermsResponse>}
     * @returns {number}
     */
    private calculateShortListLength(facetTermsResponse: Dictionary<FacetTermsResponse>): number {

        let fileFacetCountByTermCount = _.chain(facetTermsResponse)
            .groupBy((termFacet) => {
                return termFacet.terms.length;
            })
            .mapValues((terms: FacetTermsResponse[]) => {
                return terms.length;
            })
            .value();

        // Find the length of the largest array of file facets - we'll use this to determine which term count is
        // most common
        let largestFileFacetCount = _.chain(fileFacetCountByTermCount)
            .sortBy()
            .reverse()
            .value()[0];

        // Find the term count(s) with the largest number of file facets, then take the smallest term count if there
        // is more than one term count with the largest number of file facets
        let termCount = _.chain(fileFacetCountByTermCount)
            .pickBy((count: number) => {
                return count === largestFileFacetCount;
            })
            .keys()
            .sortBy()
            .value()[0];

        // Generalize term count for display
        let maxTermCount = parseInt(termCount, 10);
        if ( maxTermCount <= 3 ) {
            maxTermCount = 3;
        }
        else if ( maxTermCount > 10 ) {
            maxTermCount = 10;
        }

        return maxTermCount;
    }

    /**
     * Map current set of selected search terms to query string format.
     *
     * return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
     * if there aren't any file filters, it's just { }, not { file: { } }
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string}
     */
    private searchTermsToQueryString(searchTerms: SearchTerm[]): string {

        // Build up filter from selected search terms
        const filters = searchTerms.reduce((accum, searchTerm) => {

            let facetName = searchTerm.facetName;
            if ( !accum[facetName] ) {
                accum[facetName] = {
                    is: []
                };
            }
            accum[facetName]["is"].push(searchTerm.getSearchKey());

            return accum;
        }, {});

        // empty object if it doesn't have any filters;
        const result = Object.keys(filters).length ? {file: filters} : {};
        return JSON.stringify(result);
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
     * Create map of terms counts for each file facet, keyed by the file facet name.
     *
     * @param {FileFacet[]} fileFacets
     */
    private mapTermCountsByFacetName(fileFacets: FileFacet[]): Map<string, number> {

        return Array.from(fileFacets).reduce((accum, fileFacet: FileFacet) => {

            const termCount = fileFacet.selectedTermCount > 0 ? fileFacet.selectedTermCount : fileFacet.termCount;
            accum.set(fileFacet.name, termCount);
            return accum;
        }, new Map<string, number>());
    }

    /**
     * Remove project facet and/or project IDs from list of search terms as we do not want to restrict the table result
     * set to just the selected project.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {string} selectedEntity
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private removeProjectSearchTerms(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>, selectedEntity: string): Map<string, Set<SearchTerm>> {

        const filteredSearchTerms = new Map(searchTermsByFacetName);
        filteredSearchTerms.delete(FileFacetName.PROJECT);
        filteredSearchTerms.delete(FileFacetName.PROJECT_ID);
        return filteredSearchTerms;
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
