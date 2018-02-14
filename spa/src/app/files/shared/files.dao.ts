/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to file-related end points.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CCBaseDAO } from "./../../cc-http";
import "rxjs/add/observable/of";

import { FileSummary } from "../file-summary/file-summary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { Dictionary } from "../../shared/dictionary";
import { ICGCQuery } from "./icgc-query";
import { Term } from "./term.model";
import { FileFacet } from "./file-facet.model";
import { ConfigService } from "../../config/config.service";
import { FileFacetMetadata } from "../file-facet-metadata/file-facet-metadata.model";
import { TableModel } from "../table/table.model";
import { PaginationModel } from "../table/pagination.model";
import { TableParamsModel } from "../table/table-params.model";

interface FilesAPIResponse {
    termFacets: Dictionary<{
        terms: Array<{ term: string; count: number }>;
        total: number
    }>;
    pagination: PaginationModel;
    hits: any[];
}

interface Ordering {
    order: string[];
}


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
     * Fetch Facet Order
     *
     * @returns {Observable<FileFacetMetadata[]>}
     */
    fetchFileFacetMetadata(): Observable<FileFacetMetadata[]> {

        if ( !this.configService.hasSortOrder() ) {
            return Observable.of([]);
        }

        const domain = this.configService.getApiUrl();
        const url = `${domain}/repository/files/meta`;
        return this.get(url)
            .catch((error: any, caughtObs: Observable<any>) => {
                // if the endpoint returns an error, empty array to be treated as no-ordering
                return [];
            });
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
        const filterParams = Object.assign({from: 1, size: 1}, query);

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
        let filterParams = Object.assign({from: tableParams.from, size: tableParams.size}, query);
        if ( tableParams.sort && tableParams.order ) {
            filterParams = Object.assign(filterParams, {sort: tableParams.sort, order: tableParams.order});
        }

        return this.get<FilesAPIResponse>(url, filterParams)
            .map((repositoryFiles: FilesAPIResponse) => {
                    // keep our size as this is being lost on API return at the moment when the result set is less than the page size.
                    let pagination = Object.assign(repositoryFiles.pagination, {size: tableParams.size} );
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

        if ( this.configService.hasSortOrder() ) {
            const url = this.buildApiUrl(`/repository/files/order`);
            return this.get(url);
        }
        return Observable.of({order: []});
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

        window.location.href = this.buildApiUrl(`//repository/files/export?${params.toString()}`);
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

        const domain = this.configService.getApiUrl();
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

        const facetNames = Object.keys(filesAPIResponse.termFacets);
        const newFileFacets = facetNames.map((facetName) => {

            const responseFileFacet = filesAPIResponse.termFacets[facetName];
            const oldFacet: FileFacet = selectedFacetsByName.get(facetName);

            let responseTerms: Term[] = [];

            // the response from ICGC is missing the terms field instead of being an empty array
            // we need to check it's existence before iterating over it.
            if ( responseFileFacet.terms ) {

                // Create term from response, maintaining the currently selected term.
                responseTerms = responseFileFacet.terms.map((responseTerm) => {

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
            return new FileFacet(facetName, responseFileFacet.total, responseTerms);
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
        let donorIdFileFacet = new FileFacet("donorId", 9999999, donorIdTerms, "SEARCH");
        newFileFacets.unshift(donorIdFileFacet);

        // Add file ID search facet
        let fileIdFileFacet = new FileFacet("fileId", 88888888, fileIdTerms, "SEARCH");
        newFileFacets.unshift(fileIdFileFacet);

        // Check if we have a sort order and if so, order facets accordingly
        if ( ordering.order.length ) {

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
