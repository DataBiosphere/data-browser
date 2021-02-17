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
import { SearchTerm } from "../search-term.model";
import { Params } from "@angular/router";
import { SearchTermUrl } from "./search-term-url.model";
import { QueryStringSearchTerm } from "./query-string-search-term.model";

@Injectable()
export class SearchTermUrlService {

    private PARAM_FILTER = "filter";
    private ERROR_TEXT_PARSE = "Unable to parse query string parameter";
    private ERROR_TEXT_SYNTAX = "Invalid query string parameter";

    /**
     * Parse filter query string parameter, if present, and convert string to query string search terms. Called when
     * initializing app state from the query string.
     *
     * @param {Params} params
     * @throws {Error}
     */
    public parseQueryStringSearchTerms(params: Params): QueryStringSearchTerm[] {

        if ( !this.isFilterParamSpecified(params) ) {
            return [];
        }

        // We have a filter, let's extract it.
        const filterParam = params[this.PARAM_FILTER];
        let filter;
        try {
            filter = JSON.parse(filterParam); // throws SyntaxError
        }
        catch(e) {
            throw Error(this.buildParseErrorMessage(this.PARAM_FILTER, filterParam));
        }

        // Confirm filter was parsed correctly.
        if ( !filter || !filter.length ) {
            throw Error(this.buildParseErrorMessage(this.PARAM_FILTER, filterParam));
        }
        
        // Confirm each filter value has both facetName and terms values
        if ( !this.isFilterSyntaxValid(filter) ) {
            throw Error(this.buildSyntaxErrorMessage(this.PARAM_FILTER, filterParam));
        }
        
        // Confirm terms values are valid
        if ( !this.isTermsSyntaxValid(filter) ) {
            throw Error(this.buildSyntaxErrorMessage(this.PARAM_FILTER, filterParam));
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
     * Build parse error message.
     * 
     * @param {string} paramName
     * @param {string} filterParam
     * @returns {string}
     */
    private buildParseErrorMessage(paramName: string, filterParam: string): string {

        return `${this.ERROR_TEXT_PARSE} "${paramName}": ${filterParam}`;
    }

    /**
     * Build syntax error message.
     *
     * @param {string} paramName
     * @param {string} filterParam
     * @returns {string}
     */
    private buildSyntaxErrorMessage(paramName: string, filterParam: string): string {

        return `${this.ERROR_TEXT_SYNTAX} "${paramName}": ${filterParam}`;
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

    /**
     * Returns true if each value in filter param is valid. That is, each value has both facetName and terms values.
     * 
     * @param {any} filter
     */
    private isFilterSyntaxValid(filter): boolean {

        return filter.every(f => {
            return f.facetName && f.terms;
        });
    }

    /**
     * Returns true if terms values are valid. terms must be a string array.
     *
     * @param {any} filter
     */
    private isTermsSyntaxValid(filter): boolean {

        return filter.every(f => {
            const terms = f.terms;
            if ( !Array.isArray(terms) ) {
                return false;
            }
            return terms.every(t => {
                return typeof t === "string" || this.isTermAgeRangeSyntaxValid(t);
            })
        });
    }

    /**
     * Returns true if terms value is a valid age range value.
     *
     * @param {any} term
     */
    private isTermAgeRangeSyntaxValid(term): boolean {
        
        return (term.ageMax || term.ageMax === 0) &&
            (term.ageMin || term.ageMin === 0) &&
            term.ageUnit;
    }
}

