/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to file-related end points.
 */
// Core dependencies
import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import { CCBaseDAO } from "./../../cc-http";
import "rxjs/add/observable/of";

// App dependencies
import { FacetTermsResponse } from "./facet-terms-response.model";
import { FileSummary } from "../file-summary/file-summary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FilesAPIResponse } from "./files-api-response.model";
import { Dictionary } from "../../shared/dictionary";
import { ICGCQuery } from "./icgc-query";
import { Term } from "./term.model";
import { FileFacet } from "./file-facet.model";
import { ConfigService } from "../../config/config.service";
import { TableModel } from "../table/table.model";
import { PaginationModel } from "../table/pagination.model";
import { TableParamsModel } from "../table/table-params.model";

@Injectable()
export class FilesDAO extends CCBaseDAO {

    constructor(http: Http, private configService: ConfigService) {
        super(http);
    }

    /**
     * Fet FileSummary
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
     *
     * @param [selectedFacets]
     * @returns {Observable<FileSummary>}
     */
    fetchFileSummary(selectedFacets?: FileFacet[]): Observable<FileSummary> {

        const query = new ICGCQuery(this.facetsToQueryString(selectedFacets));

        const url = this.buildApiUrl(`/repository/files/summary`);
        const filterParams = Object.assign({}, query);
        return this.get<FileSummary>(url, filterParams);
    }


    /**
     * Fetch FileFacets
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/findAll
     *
     * @param selectedFacetsByName
     * @param ordering
     * @returns {Observable<FileFacet[]>}
     */
    fetchFileFacets(selectedFacetsByName: Map<string, FileFacet>, ordering): Observable<FileFacet[]> {

        const selectedFacets = Array.from(selectedFacetsByName.values());

        const query = new ICGCQuery(this.facetsToQueryString(selectedFacets));

        const url = this.buildApiUrl(`/repository/files`);
        const filterParams = Object.assign({ from: 1, size: 1 }, query);

        return this.get<FilesAPIResponse>(url, filterParams)
            .map((repositoryFiles: FilesAPIResponse) => {
                    return this.createFileFacets(selectedFacetsByName, repositoryFiles, ordering);
                }
            );
    }

    /**
     * Fetch the table data
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {PaginationModel} pagination
     * @returns {Observable<TableModel>}
     */
    fetchFileTableData(selectedFacetsByName: Map<string, FileFacet>, tableParams: TableParamsModel): Observable<TableModel> {

        const selectedFacets = Array.from(selectedFacetsByName.values());

        const query = new ICGCQuery(this.facetsToQueryString(selectedFacets));

        const url = this.buildApiUrl(`/repository/files`);
        let filterParams = Object.assign({ from: tableParams.from, size: tableParams.size }, query);
        if (tableParams.sort && tableParams.order) {
            filterParams = Object.assign(filterParams, { sort: tableParams.sort, order: tableParams.order });
        }

        return this.get<FilesAPIResponse>(url, filterParams)
            .map((repositoryFiles: FilesAPIResponse) => {
                    // keep our size as this is being lost on API return at the moment when the result set is less than
                    // the page size.
                    let pagination = Object.assign(repositoryFiles.pagination, { size: tableParams.size });
                    return new TableModel(repositoryFiles.hits, repositoryFiles.pagination);
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
        return this.get(url);
    }

    /**
     * Fetch Ordered File Facets
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @returns {Observable<FileFacet[]>}
     */
    fetchOrderedFileFacets(selectedFacetsByName: Map<string, FileFacet>): Observable<FileFacet[]> {

        return this.fetchFacetOrdering()
            .switchMap((ordering: Ordering) => {
                return this.fetchFileFacets(selectedFacetsByName, ordering);
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

        if (filters.file && filters.file.repoName) {
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

        return this.post<Dictionary<FileManifestSummary>>(url, form);
    }

    /**
     * Download Manifest
     *
     * @param selectedFacets
     * @returns {any}
     */
    downloadFileManifest(selectedFacets: FileFacet[]): Observable<any> {

        const query = new ICGCQuery(this.facetsToQueryString(selectedFacets), "tarball");

        let params = new URLSearchParams();
        Object.keys(query).forEach((paramName) => {
            params.append(paramName, query[paramName]);
        });

        window.location.href = this.buildApiUrl(`/repository/files/export?${params.toString()}`);
        return Observable.of(true); // TODO error handling? I'm not sure setting the href causes any errors
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
    private createFileFacets(selectedFacetsByName: Map<string, FileFacet>, filesAPIResponse: FilesAPIResponse, ordering: Ordering): FileFacet[] {

        // Determine the set of facets that are to be displayed
        const visibleFacets = _.pick(filesAPIResponse.termFacets, ordering.order) as Dictionary<FacetTermsResponse>;
        ;

        // Calculate the number of terms to display on each facet card
        const shortListLength = this.calculateShortListLength(visibleFacets);

        const facetNames = Object.keys(visibleFacets);
        const newFileFacets = facetNames.map((facetName) => {

            const responseFileFacet = visibleFacets[facetName];
            const oldFacet: FileFacet = selectedFacetsByName.get(facetName);

            let responseTerms: Term[] = [];

            // the response from ICGC is missing the terms field instead of being an empty array
            // we need to check it's existence before iterating over it.
            if (responseFileFacet.terms) {

                // Create term from response, maintaining the currently selected term.
                responseTerms = responseFileFacet.terms.map((responseTerm) => {

                    let oldTerm: Term;
                    if (oldFacet) {
                        oldTerm = oldFacet.termsByName.get(responseTerm.term);
                    }

                    let selected = false;
                    if (oldTerm) {
                        selected = oldTerm.selected;
                    }

                    return new Term(responseTerm.term, responseTerm.count, selected, "000000");
                });
            }

            if (!responseFileFacet.total) {
                responseFileFacet.total = 0; // their default is undefined instead of zero
            }

            // Create file facet from newly built terms and newly calculated total
            return new FileFacet(facetName, responseFileFacet.total, responseTerms, shortListLength);
        });

        let fileIdTerms = [];
        if (selectedFacetsByName.get("fileId")) {
            fileIdTerms = selectedFacetsByName.get("fileId").terms;
        }

        let donorIdTerms = [];
        if (selectedFacetsByName.get("donorId")) {
            donorIdTerms = selectedFacetsByName.get("donorId").terms;
        }

        // Add donor ID search facet
        let donorIdFileFacet = new FileFacet("donorId", 9999999, donorIdTerms, shortListLength, "SEARCH");
        newFileFacets.unshift(donorIdFileFacet);

        // Add file ID search facet
        let fileIdFileFacet = new FileFacet("fileId", 88888888, fileIdTerms, shortListLength, "SEARCH");
        newFileFacets.unshift(fileIdFileFacet);

        // Check if we have a sort order and if so, order facets accordingly
        if (ordering.order.length) {

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
        if (maxTermCount <= 3) {
            maxTermCount = 3;
        }
        else if (maxTermCount > 10) {
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
            if (!facet.terms || !facet.terms.length) {
                return facetAcc;
            }

            // get an array of term names if any
            const termNames = facet.selectedTerms.map((term) => {
                return term.name;
            });

            if (termNames.length) {
                // only add the facet if there is a selected term.
                facetAcc[facet.name] = { is: termNames };
            }

            return facetAcc;
        }, {});

        // empty object if it doesn't have any filters;
        const result = Object.keys(filters).length ? { file: filters } : {};
        return JSON.stringify(result);
    }
}
