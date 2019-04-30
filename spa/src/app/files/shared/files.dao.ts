/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Data access object, connecting to file-related end points.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Dictionary } from "../../dictionary";
import { EntitySearchResults } from "./entity-search-results.model";
import { FileSummary } from "../file-summary/file-summary";
import { FilesAPIResponse } from "./files-api-response.model";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { FacetTermsResponse } from "./facet-terms-response.model";
import { SearchTermDAO } from "./search-term.dao";
import { SearchTerm } from "../search/search-term.model";
import { TableParamsModel } from "../table/table-params.model";
import { Term } from "./term.model";
import { TermResponse } from "./term-response.model";

@Injectable()
export class FilesDAO {

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
        const filters = this.searchTermDAO.marshallSearchTerms(searchTerms);

        return this.httpClient.get<FileSummary>(url, {
            params: {
                filters
            }
        });
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg projects, samples, files), as
     * well as facet terms and their corresponding counts. When viewing the project tables, we want to remove any
     * selected projects facets as we do not want to restrict the table result set to just the selected projects. That is,
     * projects tab is not filterable by project.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    fetchEntitySearchResults(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
        tableParams: TableParamsModel,
        selectedEntity: string,
        filterableByProject: boolean): Observable<EntitySearchResults> {

        // Build API URL
        const url = this.buildApiUrl(`/repository/` + selectedEntity);

        // Build up param map
        let paramMap;
        if ( filterableByProject ) {
            paramMap = this.buildFetchSearchResultsQueryParams(searchTermsBySearchKey, tableParams);
        }
        else {
            const filteredSearchTerms = this.removeProjectSearchTerms(searchTermsBySearchKey, selectedEntity);
            paramMap = this.buildFetchSearchResultsQueryParams(filteredSearchTerms, tableParams);
        }

        return this.httpClient
            .get<FilesAPIResponse>(url, {params: paramMap})
            .pipe(
                map((apiResponse: FilesAPIResponse) => {

                    const fileFacets = this.bindFileFacets(searchTermsBySearchKey, apiResponse.termFacets);
                    const termCountsByFacetName = this.mapTermCountsByFacetName(fileFacets);
                    const searchTerms = this.searchTermDAO.bindSearchTerms(apiResponse.termFacets);

                    const tableModel = {
                        data: apiResponse.hits,
                        pagination: apiResponse.pagination,
                        tableName: selectedEntity,
                        termCountsByFacetName
                    };

                    return {
                        fileFacets,
                        searchTerms,
                        tableModel
                    };
                })
            );
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
     * Build up set of query params for fetching search results.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     */
    private buildFetchSearchResultsQueryParams(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>, tableParams: TableParamsModel) {

        // Build query params
        const searchTermSets = searchTermsBySearchKey.values();
        const searchTerms = Array.from(searchTermSets).reduce((accum, searchTermSet) => {
            return accum.concat(Array.from(searchTermSet));
        }, []);
        const filters = this.searchTermDAO.marshallSearchTerms(searchTerms);

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
     * @param {Dictionary<FacetTermsResponse>} termFacets
     * @returns {FileFacet[]}
     */
    private bindFileFacets(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>,
        termFacets: Dictionary<FacetTermsResponse>): FileFacet[] {

        return Object.keys(termFacets).map((facetName) => {

            const responseFileFacet = termFacets[facetName];
            
            // Determine the set of currently selected search terms for this facet
            const searchTermKeys = this.listFacetSearchTermValues(facetName, searchTermsByFacetName);

            // Build up the list of terms from the facet response
            const responseTerms = this.bindFileFacetTerms(facetName, responseFileFacet.terms, searchTermKeys);

            // Create file facet from newly built terms and newly calculated total
            return new FileFacet(facetName, (responseFileFacet.total || 0), responseTerms);
        });
    }

    /**
     * Create a set of terms from the terms returned in the response. Maintain selected state of terms from current set
     * of search terms.
     * 
     * @param {string} facetName
     * @param {TermResponse[]} termResponses
     * @returns {Term[]}
     */
    private bindFileFacetTerms(facetName: string, termResponses: TermResponse[], searchTermKeys: string[]): Term[] {

        return termResponses.reduce((accum, termResponse: TermResponse) => {
            
            // Default term name to "Unspecified" if no value returned
            const termName = (termResponse.term || "Unspecified");

            // Determine if term is currently selected as a search term
            let selected = searchTermKeys.indexOf(termName) >= 0;

            // Create new term - default name to "Unspecified" if no value is returned
            const term = new Term(termName, termResponse.count, selected);
            accum.push(term);
            
            return accum;
        }, []);
    }

    /**
     * Return the set of search terms for the specified facet, if any.
     * 
     * @param {string} facetName
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @returns {string[]}
     */
    private listFacetSearchTermValues(facetName: string, searchTermsBySearchKey: Map<string, Set<SearchTerm>>): string[] {

        const searchTermSet: Set<SearchTerm> = searchTermsBySearchKey.get(facetName);
        return searchTermSet ?
            Array.from(searchTermSet.values()).map((searchTerm) => searchTerm.getSearchValue()) :
            [];
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
}
