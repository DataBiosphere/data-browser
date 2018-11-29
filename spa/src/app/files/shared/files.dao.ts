/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to file-related end points.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

// App dependencies
import { EntitySearchResults } from "./entity-search-results.model";
import { FacetTermsResponse } from "./facet-terms-response.model";
import { FileSummary } from "../file-summary/file-summary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FilesAPIResponse } from "./files-api-response.model";
import { Dictionary } from "../../shared/dictionary";
import { ICGCQuery } from "./icgc-query";
import { Term } from "./term.model";
import { FileFacet } from "./file-facet.model";
import { ConfigService } from "../../config/config.service";
import { TableParamsModel } from "../table/table-params.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class FilesDAO {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {}

    /**
     * Fet FileSummary
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
     *
     * @param [selectedFacets]
     * @returns {Observable<FileSummary>}
     */
    fetchFileSummary(selectedFacets: FileFacet[]): Observable<any> {

        // todo convert back from any to FileSummary.

        // Build up API URL
        const url = this.buildApiUrl(`/repository/summary`);

        // Build up the query params
        const filters = this.facetsToQueryString(selectedFacets);

        return this.httpClient.get<any>(url, {
            params: {
                filters
            }
        });
    }


    /**
     * Fetch the set of facets matching the current set of selected facets, for the current selected tab. Offset and
     * limit are set to 1 and 1 to minimize response size. Currently only used when displaying the counts on manifest
     * download modal (where we are ignoring any file formats in the set of selected facets and need to do an explicit
     * query to grab the correct counts for that state).
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/findAll
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {string} tab
     * @param {Ordering} ordering
     * @returns {Observable<FileFacet[]>}
     */
    fetchFileFacets(
        selectedFacetsByName: Map<string, FileFacet>,
        tab: string,
        ordering?: Ordering): Observable<FileFacet[]> {

        // Build the API URL
        const url = this.buildApiUrl(`/repository/` + tab);

        // Build up the query params
        const selectedFacets = Array.from(selectedFacetsByName.values());
        const filters = this.facetsToQueryString(selectedFacets);

        return this.httpClient
            .get<FilesAPIResponse>(url, {
                params: {
                    from: "1",
                    size: "1",
                    filters
                }
            })
            .map((repositoryFiles: FilesAPIResponse) => {
                    return this.createFileFacets(selectedFacetsByName, repositoryFiles, ordering);
                }
            );
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg projects, specimens, files), as
     * well as facet terms and their corresponding counts.
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @returns {Observable<EntitySearchResults>}
     */
    fetchEntitySearchResults(
        selectedFacetsByName: Map<string, FileFacet>,
        tableParams: TableParamsModel,
        selectedEntity: string): Observable<EntitySearchResults> {

        // Build API URL
        const url = this.buildApiUrl(`/repository/` + selectedEntity);

        // Build query params
        const selectedFacets = Array.from(selectedFacetsByName.values());
        const filters = this.facetsToQueryString(selectedFacets);

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

        return this.httpClient.get<FilesAPIResponse>(url, {params: paramMap})
            .map((repositoryFiles: FilesAPIResponse) => {

                    const fileFacets = this.createFileFacets(selectedFacetsByName, repositoryFiles);

                    const tableModel = {
                        data: repositoryFiles.hits,
                        pagination: repositoryFiles.pagination,
                        tableName: selectedEntity
                    };

                    return {
                        fileFacets,
                        tableModel
                    };
                }
            );
    }

    /**
     * Fetch Facet Ordering
     *
     * @returns {Observable<Ordering>}
     */
    fetchFacetOrdering(): Observable<Ordering> {

        const url = this.buildApiUrl(`/repository/files/order`);
        return this.httpClient.get<Ordering>(url);
    }

    /**
     * Fetch Ordered File Facets
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @returns {Observable<FileFacet[]>}
     */
    fetchOrderedFileFacets(selectedFacetsByName: Map<string, FileFacet>, tab: string): Observable<FileFacet[]> {

        return this.fetchFacetOrdering()
            .switchMap((ordering: Ordering) => {

                // Temporary manually order the facets.
                const bypassOrdering = [
                    "project",
                    "genusSpecies",
                    "biologicalSex",
                    "organ",
                    "organPart",
                    "organismAge",
                    "organismAgeUnit",
                    "disease",
                    "laboratory",
                    "preservationMethod",
                    "instrumentManufacturerModel",
                    "libraryConstructionApproach",
                    "protocol",
                    "fileFormat",
                    "totalCells"
                ];

                ordering.order = bypassOrdering;
                return this.fetchFileFacets(selectedFacetsByName, tab, ordering);
            });
    }

    /**
     * Fetch Manifest Summary
     *
     * @param selectedFacets
     * @returns {Observable<FileManifestSummary>}
     */
    fetchFileManifestSummary(selectedFacets: FileFacet[]): Observable<Dictionary<FileManifestSummary>> {

        const query = new ICGCQuery(this.facetsToQueryString(selectedFacets));

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
     * Download Manifest
     *
     * @param selectedFacets
     * @returns {any}
     */
    public downloadFileManifest(selectedFacets: FileFacet[]): Observable<any> {

        window.location.href = this.buildManifestUrl(selectedFacets, "tarball");
        return Observable.of(true); // TODO error handling? I'm not sure setting the href causes any errors
    }

    /**
     * Build the manifest download URL - required for both downloading the manifest, as well as requesting a Matrix
     * export.
     *
     * @param {FileFacet[]} selectedFacets
     * @param {string} format
     * @returns {string}
     */
    public buildManifestUrl(selectedFacets: FileFacet[], format?: string): string {

        const query = new ICGCQuery(this.facetsToQueryString(selectedFacets), format);

        let params = new URLSearchParams();
        Object.keys(query).forEach((paramName) => {
            params.append(paramName, query[paramName]);
        });

        return this.buildApiUrl(`/repository/files/export?${params.toString()}`);
    }

    /**
     * Privates
     */

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
     * Map files API response into FileFacet objects.
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {FilesAPIResponse} filesAPIResponse
     * @param {Ordering} ordering
     * @returns {FileFacet[]}
     */
    private createFileFacets(
        selectedFacetsByName: Map<string, FileFacet>,
        filesAPIResponse: FilesAPIResponse,
        ordering?: Ordering): FileFacet[] {

        // Determine the set of facets that are to be displayed
        let visibleFacets;
        if ( !!ordering ) {
            visibleFacets = _.pick(filesAPIResponse.termFacets, ordering.order) as Dictionary<FacetTermsResponse>;
        }
        else {
            visibleFacets = Object.assign({}, filesAPIResponse.termFacets);
        }

        // Calculate the number of terms to display on each facet card
        const shortListLength = this.calculateShortListLength(visibleFacets);

        const facetNames = Object.keys(visibleFacets);
        const newFileFacets = facetNames.map((facetName) => {

            const responseFileFacet = visibleFacets[facetName];
            const oldFacet: FileFacet = selectedFacetsByName.get(facetName);

            let responseTerms: Term[] = [];

            // the response from ICGC is missing the terms field instead of being an empty array
            // we need to check it's existence before iterating over it.
            if ( responseFileFacet.terms ) {

                // Create term from response, maintaining the currently selected term.
                responseTerms = responseFileFacet.terms.map((responseTerm) => {

                    if ( responseTerm.term == null ) {
                        responseTerm.term = "Unspecified";
                    }

                    let oldTerm: Term;
                    if ( oldFacet ) {
                        oldTerm = oldFacet.termsByName.get(responseTerm.term);
                    }

                    let selected = false;
                    if ( oldTerm ) {
                        selected = oldTerm.selected;
                    }

                    return new Term(responseTerm.term, responseTerm.count, selected, "000000");
                });
            }

            if ( !responseFileFacet.total ) {
                responseFileFacet.total = 0; // their default is undefined instead of zero
            }

            // Create file facet from newly built terms and newly calculated total
            return new FileFacet(facetName, responseFileFacet.total, responseTerms, shortListLength);
        });

        let fileIdTerms = [];
        if ( selectedFacetsByName.get("fileId") ) {
            fileIdTerms = selectedFacetsByName.get("fileId").terms;
        }

        let donorIdTerms = [];
        if ( selectedFacetsByName.get("donorId") ) {
            donorIdTerms = selectedFacetsByName.get("donorId").terms;
        }

        // Add donor ID search facet
        let donorIdFileFacet = new FileFacet("donorId", 9999999, donorIdTerms, shortListLength, "SEARCH");
        newFileFacets.unshift(donorIdFileFacet);

        // Add file ID search facet
        let fileIdFileFacet = new FileFacet("fileId", 88888888, fileIdTerms, shortListLength, "SEARCH");
        newFileFacets.unshift(fileIdFileFacet);

        // Check if we have a sort order and if so, order facets accordingly
        if ( ordering && ordering.order.length ) {

            const facetMap = newFileFacets.reduce((acc: Map<string, FileFacet>, facet: FileFacet) => {
                return acc.set(facet.name, facet);
            }, new Map<string, FileFacet>());

            return ordering.order.map((name: string) => {
                return facetMap.get(name);
            });
        }

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
     * Filter To Querystring
     *
     * return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
     * if there aren't any file filters, it's just { }, not { file: { } }
     *
     * TODO is this the ICGC workaround?
     *
     * @param {FileFacet[]} selectedFacets
     * @returns {string}
     */
    private facetsToQueryString(selectedFacets: FileFacet[]): string {


        let filters = selectedFacets.reduce((facetAcc, facet) => {

            // paranoid check for no facets.
            if ( !facet.terms || !facet.terms.length ) {
                return facetAcc;
            }

            // get an array of term names if any
            const termNames = facet.selectedTerms.map((term) => {

                // Returns "none" if term name is "Unspecified".
                if ( term.name === "Unspecified" ) {
                    return "null";
                }

                return term.name;
            });

            if ( termNames.length ) {
                // only add the facet if there is a selected term.
                facetAcc[facet.name] = {is: termNames};
            }

            return facetAcc;
        }, {});

        // empty object if it doesn't have any filters;
        const result = Object.keys(filters).length ? {file: filters} : {};
        return JSON.stringify(result);
    }
}
