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
import { EntitySearchResults } from "./entity-search-results.model";
import { FileSummary } from "../file-summary/file-summary";
import { FilesAPIResponse } from "./files-api-response.model";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermHttpService } from "./search-term-http.service";
import { TableParamsModel } from "../table/table-params.model";
import { Term } from "./term.model";
import { TermResponse } from "./term-response.model";

@Injectable()
export class FilesDAO {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {HttpClient} httpClient
     */
    constructor(
        private configService: ConfigService,
        private searchTermHttpService: SearchTermHttpService,
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
        const filters = this.searchTermHttpService.marshallSearchTerms(searchTerms);

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
        const filters = this.searchTermHttpService.marshallSearchTerms(searchTerms);

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

        const termFacets = filesAPIResponse.termFacets;
        const newFileFacets = Object.keys(termFacets).map((facetName) => {

            const responseFileFacet = termFacets[facetName];
            
            // Determine the set of currently selected search terms for this facet
            const searchTermKeys = this.listFacetSearchTermKeys(facetName, searchTermsByFacetName);

            // Build up the list of terms from the facet response
            const responseTerms = this.createFileFacetTerms(facetName, responseFileFacet.terms, searchTermKeys);

            // Create file facet from newly built terms and newly calculated total
            return new FileFacet(facetName, (responseFileFacet.total || 0), responseTerms);
        });

        return newFileFacets;
    }

    /**
     * Parse the set of terms from the file facet response into term objects. Maintain selected state of terms from
     * current set of search terms.
     * 
     * @param {string} facetName
     * @param {TermResponse[]} termResponses
     * @returns {Term[]}
     */
    private createFileFacetTerms(facetName: string, termResponses: TermResponse[], searchTermKeys: string[]): Term[] {

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
     * Find the set of search terms for the specified facet, if any.
     * 
     * @param {string} facetName
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @returns {string[]}
     */
    listFacetSearchTermKeys(facetName: string, searchTermsByFacetName: Map<string, Set<SearchTerm>>): string[] {

        const searchTermSet: Set<SearchTerm> = searchTermsByFacetName.get(facetName);
        return searchTermSet ?
            Array.from(searchTermSet.values()).map((searchTerm) => searchTerm.name) :
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
