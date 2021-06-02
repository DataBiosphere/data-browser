/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating entity-related functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { Dictionary } from "../../dictionary";
import { EntityAPIResponse } from "../http/entity-api-response.model";
import { EntityRequestService } from "../entity/entity-request.service";
import { EntitySearchResults } from "./entity-search-results.model";
import { FacetAgeRange } from "../facet/facet-age-range/facet-age-range.model";
import { FacetAgeRangeName } from "../facet/facet-age-range/facet-age-range-name.model";
import { AgeUnit } from "../facet/facet-age-range/age-unit.model";
import { Facet } from "../facet/facet.model";
import { ResponseFacet } from "../http/response-facet.model";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { FileSummary } from "../file-summary/file-summary";
import { ResponseTerm } from "../http/response-term.model";
import { HttpService } from "../http/http.service";
import { ResponseTermService } from "../http/response-term.service";
import { SearchAgeRange } from "../search/search-age-range.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { TableParams } from "../table/pagination/table-params.model";
import { Term } from "./term.model";

@Injectable()
export class FilesService {

    /**
     * @param {ConfigService} configService
     * @param {EntityRequestService} entityRequestService
     * @param {HttpService} httpService
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {ResponseTermService} responseTermService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private entityRequestService: EntityRequestService,
                private httpService: HttpService,
                private searchTermHttpService: SearchTermHttpService,
                private responseTermService: ResponseTermService,
                private httpClient: HttpClient) {
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg samples, files), as
     * well as facet terms and their corresponding counts.
     *
     * @param {Catalog} catalog
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey - set of currently selected search terms
     * @param {TableParams} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    public fetchEntitySearchResults(catalog: Catalog,
                                    searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                    tableParams: TableParams,
                                    selectedEntity: string,
                                    filterableByProject = true): Observable<EntitySearchResults> {


        // Build model of HTTP request for entity API
        const entityRequest = 
            this.entityRequestService.buildEntityRequest(
                catalog, searchTermsBySearchKey, tableParams, selectedEntity, filterableByProject);

        return this.httpClient
            .get<EntityAPIResponse>(entityRequest.url, {params: entityRequest.params})
            .pipe(
                map((apiResponse: EntityAPIResponse) =>
                    this.bindEntitySearchResultsResponse(apiResponse, searchTermsBySearchKey, selectedEntity))
            );
    }

    /**
     * Fetch file summary, passing in the current set of search terms.
     *
     * {SearchTerm[]} selectedSearchTerms
     * @returns {Observable<FileSummary>}
     */
    public fetchFileSummary(catalog: Catalog, searchTerms: SearchTerm[]): Observable<FileSummary> {

        // Build up API URL
        const url = this.configService.getSummaryUrl();

        // Build up the query params
        const filters = this.searchTermHttpService.marshallSearchTerms(searchTerms);
        const params = this.httpService.createIndexParams(catalog, {filters});

        return this.httpClient.get<FileSummary>(url, {params}).pipe(
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
     * Parse the API response and build up entity search results.
     *
     * @param {EntityAPIResponse} apiResponse
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey - set of currently selected search terms
     * @param {string} selectedEntity
     * @returns {EntitySearchResults}
     */
    private bindEntitySearchResultsResponse(apiResponse: EntityAPIResponse,
                                            searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                            selectedEntity: string): EntitySearchResults {

        // Build up term facets
        const facets = this.bindFacets(searchTermsBySearchKey, apiResponse.termFacets);
        const termCountsByFacetName = this.mapTermCountsByFacetName(facets);
        const searchTerms = this.searchTermHttpService.bindSearchTerms(apiResponse.termFacets);
        const searchEntities = this.searchTermHttpService.bindSearchEntities(apiResponse.termFacets);
        
        const tableModel = {
            data: apiResponse.hits,
            pagination: apiResponse.pagination,
            tableName: selectedEntity,
            termCountsByFacetName
        };

        return {
            facets,
            searchEntities,
            searchTerms,
            tableModel
        };
    }

    /**
     * Map files API response into FileFacet objects, maintaining selected state of terms. This is specifically for
     * facets returned from the backend (which are facets with a corresponding list of terms) and not other types of
     * facets, for example, facets with a selected range.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {Dictionary<ResponseFacet>} responseFacetsByName
     * @returns {Facet[]}
     */
    private bindFacets(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>,
        responseFacetsByName: Dictionary<ResponseFacet>): Facet[] {

        const facets: Facet[] = Object.keys(responseFacetsByName).map((facetName) => {

            return this.buildFileFacet(facetName, searchTermsByFacetName, responseFacetsByName[facetName]);
        });

        // Add age range facet
        facets.push(this.buildFacetAgeRange(FacetAgeRangeName.ORGANISM_AGE_RANGE, searchTermsByFacetName));
        
        return facets;
    }

    /**
     * Create a set of terms from the terms returned in the response. Maintain selected state of terms from current set
     * of search terms.
     *
     * @param {string} facetName
     * @param {ResponseTerm[]} responseTerms
     * @param {string[]} searchTermNames
     * @returns {Term[]}
     */
    private bindFacetTerms(facetName: string, responseTerms: ResponseTerm[], searchTermNames: string[]): Term[] {

        return responseTerms.reduce((accum, responseTerm: ResponseTerm) => {

            // Default term name to "Unspecified" if term name is null
            const termName = this.responseTermService.bindTermName(responseTerm);

            // Determine if term is currently selected as a search term
            let selected = searchTermNames.indexOf(termName) >= 0;

            // Create new term - default name to "Unspecified" if no value is returned
            const term = new Term(termName, responseTerm.count, selected);
            accum.push(term);

            return accum;
        }, []);
    }

    /**
     * Build up age range facet from response facet values.
     * 
     * @param {string} facetName
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     */
    private buildFacetAgeRange(facetName: string,
                               searchTermsByFacetName: Map<string, Set<SearchTerm>>): FacetAgeRange {

        // Build up range range facet
        const ageRangeSearchTerms = searchTermsByFacetName.get(FacetAgeRangeName.ORGANISM_AGE_RANGE) as Set<SearchAgeRange>;
        if ( !ageRangeSearchTerms || ageRangeSearchTerms.size === 0 ) {
            return new FacetAgeRange(FacetAgeRangeName.ORGANISM_AGE_RANGE, {
                ageUnit: AgeUnit.year
            });
        }

        // There is currently only a single value for age range
        const ageRangeSearchTerm = Array.from(ageRangeSearchTerms.values())[0];
        return new FacetAgeRange(FacetAgeRangeName.ORGANISM_AGE_RANGE, ageRangeSearchTerm.ageRange);
    }

    /**
     * Build up file facet from response facet values, matching with current selected state of terms.
     * 
     * @param {string} facetName
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {ResponseFacet} responseFacet
     */
    private buildFileFacet(facetName: string,
                           searchTermsByFacetName: Map<string, Set<SearchTerm>>,
                           responseFacet: ResponseFacet): FileFacet {

        // Determine the set of currently selected search term names for this facet
        const searchTermNames = this.listFacetSearchTermNames(facetName, searchTermsByFacetName);

        // Build up the list of terms from the facet response
        const responseTerms = this.bindFacetTerms(facetName, responseFacet.terms, searchTermNames);

        // Create facet from newly built terms and newly calculated total
        return new FileFacet(facetName, (responseFacet.total || 0), responseTerms);
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
            Array.from(searchTermSet.values()).map((searchTerm) => searchTerm.getSearchValue()) :
            [];
    }

    /**
     * Create map of terms counts for each file facet, keyed by the file facet name.
     *
     * @param {Facet[]} facets
     */
    private mapTermCountsByFacetName(facets: Facet[]): Map<string, number> {

        return facets
            .reduce((accum, facet: FileFacet) => {

                const termCount = facet.selectedTermCount > 0 ? facet.selectedTermCount : facet.termCount;
                accum.set(facet.name, termCount);
                return accum;
            }, new Map<string, number>());
    }
}
