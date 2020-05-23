/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for building entity-related HTTP request values, including API URLs and corresponding parameters. Serves
 * both version 2.0 and functionality before 2.0, with the exception of handling next/previous pagination values that
 * are returned from the API. See EntitySearchService20 for 2.0-specific funtionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { EntityRequest } from "./entity-request.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { SearchTerm } from "../search/search-term.model";
import { TableParams } from "../table/pagination/table-params.model";
import { PaginationService } from "../table/pagination/pagination.service";

@Injectable()
export class EntityRequestService {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {PaginationService} paginationService
     */
    constructor(protected configService: ConfigService,
                protected searchTermHttpService: SearchTermHttpService,
                @Inject("PAGINATION_SERVICE") protected paginationService: PaginationService) {}

    /**
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParams} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {EntityRequest}
     */
    public buildEntityRequest(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                              tableParams: TableParams,
                              selectedEntity: string,
                              filterableByProject = true): EntityRequest {

        // Build API URL
        const url = this.buildEntitySearchResultsUrl(selectedEntity);

        // Build up param map
        let params;
        if ( filterableByProject ) {
            params = this.buildFetchSearchResultsQueryParams(searchTermsBySearchKey, tableParams);
        }
        else {
            const filteredSearchTerms = this.removeProjectSearchTerms(searchTermsBySearchKey, selectedEntity);
            params = this.buildFetchSearchResultsQueryParams(filteredSearchTerms, tableParams);
        }
        
        return {
            url,
            params
        };
    }

    /**
     * Build up set of query params for fetching search results.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParams} tableParams
     */
    public buildFetchSearchResultsQueryParams(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>, tableParams: TableParams) {

        // Build query params
        const searchTermSets = searchTermsBySearchKey.values();
        const searchTerms = Array.from(searchTermSets).reduce((accum, searchTermSet) => {
            return accum.concat(Array.from(searchTermSet));
        }, []);
        const filters = this.searchTermHttpService.marshallSearchTerms(searchTerms);

        return {
            filters,
            ...this.paginationService.buildFetchSearchResultsPaginationParams(tableParams)
        };
    }

    /**
     * Build the entity search results end point URL.
     *
     * @param {string} entityName
     * @returns {string}
     */
    public buildEntitySearchResultsUrl(entityName: string): string {

        return this.configService.getEntitiesUrl(entityName);
    }

    /**
     * Remove project facet and/or project IDs from list of search terms as we do not want to restrict the table result
     * set to just the selected project.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {string} selectedEntity
     * @returns {Map<string, Set<SearchTerm>>}
     */
    protected removeProjectSearchTerms(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>, selectedEntity: string): Map<string, Set<SearchTerm>> {

        const filteredSearchTerms = new Map(searchTermsByFacetName);
        filteredSearchTerms.delete(FileFacetName.PROJECT);
        filteredSearchTerms.delete(FileFacetName.PROJECT_ID);
        return filteredSearchTerms;
    }
}
