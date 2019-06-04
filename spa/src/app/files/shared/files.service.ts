/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating file-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Dictionary } from "../../dictionary";
import { EntitySearchResults } from "./entity-search-results.model";
import { FacetTermsResponse } from "./facet-terms-response.model";
import { FilesAPIResponse } from "./files-api-response.model";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileSummary } from "../file-summary/file-summary";
import { SearchTermService } from "./search-term.service";
import { SearchTerm } from "../search/search-term.model";
import { TableParamsModel } from "../table/table-params.model";
import { Term } from "./term.model";
import { TermResponse } from "./term-response.model";
import { TermResponseService } from "./term-response.service";

@Injectable()
export class FilesService {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermService} searchTermService
     * @param {TermResponseService} termResponseService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private searchTermService: SearchTermService,
                private termResponseService: TermResponseService,
                private httpClient: HttpClient) {
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg samples, files), as
     * well as facet terms and their corresponding counts. See fetchProjectSearchResults for projects tab.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    public fetchEntitySearchResults(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                    tableParams: TableParamsModel,
                                    selectedEntity: string,
                                    filterableByProject = true): Observable<EntitySearchResults> {

        // Build API URL
        const url = this.configService.buildApiUrl(`/repository/` + selectedEntity);

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
                    const searchTerms = this.searchTermService.bindSearchTerms(apiResponse.termFacets);

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
     * Fetch file summary, passing in the current set of search terms.
     *
     * {SearchTerm[]} selectedSearchTerms
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        // Build up API URL
        const url = this.configService.buildApiUrl(`/repository/summary`);

        // Build up the query params
        const filters = this.searchTermService.marshallSearchTerms(searchTerms);

        return this.httpClient.get<FileSummary>(url, {
            params: {
                filters
            }
        }).pipe(
            map(this.bindFileSummaryResponse)
        );
    }

    /**
     * Create a new file summary object (to trigger change detecting) from the file summary response, and fix erroneous
     * total file size count if applicable.
     *
     * @param {FileSummary} fileSummary
     * @returns {FileSummary}
     */
    private bindFileSummaryResponse(fileSummary: FileSummary): FileSummary {

        const totalFileSize = (typeof fileSummary.totalFileSize === "string") ? 0 : fileSummary.totalFileSize;
        return Object.assign({}, fileSummary, {totalFileSize});
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

            // Determine the set of currently selected search term names for this facet
            const searchTermNames = this.listFacetSearchTermNames(facetName, searchTermsByFacetName);

            // Build up the list of terms from the facet response
            const responseTerms = this.bindFileFacetTerms(facetName, responseFileFacet.terms, searchTermNames);

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
     * @param {string[]} searchTermNames
     * @returns {Term[]}
     */
    private bindFileFacetTerms(facetName: string, termResponses: TermResponse[], searchTermNames: string[]): Term[] {

        return termResponses.reduce((accum, termResponse: TermResponse) => {

            // Default term name to "Unspecified" if term name is null
            const termName = this.termResponseService.bindTermName(termResponse);

            // Determine if term is currently selected as a search term
            let selected = searchTermNames.indexOf(termName) >= 0;

            // Create new term - default name to "Unspecified" if no value is returned
            const term = new Term(termName, termResponse.count, selected);
            accum.push(term);

            return accum;
        }, []);
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
        const filters = this.searchTermService.marshallSearchTerms(searchTerms);

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
     * Return the set of search terms for the specified facet, if any.
     *
     * @param {string} facetName
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @returns {string[]}
     */
    private listFacetSearchTermNames(facetName: string, searchTermsBySearchKey: Map<string, Set<SearchTerm>>): string[] {

        const searchTermSet: Set<SearchTerm> = searchTermsBySearchKey.get(facetName);
        return searchTermSet ?
            Array.from(searchTermSet.values()).map((searchTerm) => searchTerm.getName()) :
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
