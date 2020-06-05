/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service responsible for handling location-related functionality, specifically when translating from search terms to
 * a filter query string parameter in the address bar, and vice versa. Note, this is not used when un/marshalling search
 * terms for request/response functionality (see SearchTermHttpService).
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { Facet } from "../../facet/facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SearchTerm } from "../search-term.model";
import { Params } from "@angular/router";
import { GenusSpecies } from "../../shared/genus-species.model";
import { SearchTermUrl } from "./search-term-url.model";
import { QueryStringSearchTerm } from "./query-string-search-term.model";

@Injectable()
export class SearchTermUrlService {

    /**
     * Build the default set of search terms - if no search terms are selected on app init, default species to Homo
     * Sapiens.
     *
     * @returns {QueryStringSearchTerm}
     */
    public getDefaultSearchState(): QueryStringSearchTerm {

        return new QueryStringSearchTerm(FileFacetName.GENUS_SPECIES, [GenusSpecies.HOMO_SAPIENS]);
    }

    /**
     * Parse filter query string parameter, if present, and convert string to query string search terms. Called when
     * initializing app state from the query string.
     *
     * @param {Params} params
     */
    public parseQueryStringSearchTerms(params: Params): QueryStringSearchTerm[] {

        if ( !this.isFilterParamSpecified(params) ) {
            return [];
        }

        // We have a filter, let's extract it.
        let filter;
        const filterParam = params["filter"];
        try {
            filter = JSON.parse(filterParam);
        }
        catch (error) {
            console.log(error);
        }

        // Confirm filter was parsed correctly.
        if ( !filter || !filter.length || !filter[0].facetName ) {
            return [];
        }

        // Convert filter into query string search terms.
        return filter.map((selectedFacet) => {
            return new QueryStringSearchTerm(selectedFacet[SearchTermUrl.FACET_NAME], selectedFacet[SearchTermUrl.VALUE]);
        });
    }

    /**
     * Convert specified set of search terms into a URL-friendly string. Called when updating the browser's location
     * on select of file facets (location.updateState takes a string "query string" parameter). Also applicable for use as
     * queryParams value for Angular routing. Called when generating UrlTree objects, for example, when redirecting
     * internally from /projects to /projects?filter=x
     *
     * @param {Map<string, Set<SearchTerm>>} selectedSearchTermsBySearchKey
     * @returns {string}
     */
    public stringifySearchTerms(selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>): string {

        // Convert search terms to query string state
        const filterQueryStringParams =
            Array.from(selectedSearchTermsBySearchKey.keys()).reduce((accum, facetName) => {

                const searchTerms = selectedSearchTermsBySearchKey.get(facetName);
                accum.add({
                    [SearchTermUrl.FACET_NAME]: facetName,
                    [SearchTermUrl.VALUE]: Array.from(searchTerms.values()).map(searchTerm => searchTerm.getSearchValue())
                });
                return accum;
            }, new Set<any>());

        if ( filterQueryStringParams.size > 0 ) {
            return JSON.stringify(Array.from(filterQueryStringParams));
        }

        return "";
    }

    /**
     * Returns true if a filter state is encoded in the query params.
     *
     * @param {Params} params
     * @returns {boolean}
     */
    private isFilterParamSpecified(params: Params): boolean {

        return !!params["filter"];
    }
}

