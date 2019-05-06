/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Search-related HTTP functionality, including the selection and querying of file data, and parsing of file responses.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "./file-facet-name.model";
import { Dictionary } from "../../dictionary";
import { FacetTermsResponse } from "./facet-terms-response.model";
import { TermResponse } from "./term-response.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";
import { SearchEntity } from "../search/search-entity.model";
import { TermResponseService } from "./term-response.service";

@Injectable()
export class SearchTermDAO {

    // Search blacklist - exclude from set of search terms
    private SEARCH_TERM_BLACKLIST = [
        "contactName",
        "laboratory",
        "organismAge",
        "organismAgeUnit",
        "pairedEnd"
    ];

    /**
     * @param {TermResponseService} termResponseService
     */
    constructor(private termResponseService: TermResponseService) {}

    /**
     * Create search terms for each term facet, for each facet, in the specified response.
     *
     * @param {Dictionary<FacetTermsResponse>} termFacets
     * @returns {SearchTerm[]}
     */
    public bindSearchTerms(termFacets: Dictionary<FacetTermsResponse>): SearchTerm[] {

        return Object.keys(termFacets).reduce((accum, facetName) => {

            // Do not create search terms for any black listed facets
            if ( this.SEARCH_TERM_BLACKLIST.indexOf(facetName) >= 0 ) {
                return accum;
            }

            const responseFileFacet = termFacets[facetName];
            const projectFacet = facetName === FileFacetName.PROJECT;
            responseFileFacet.terms.forEach((termResponse: TermResponse) => {

                if ( projectFacet ) {
                    const projectSearchEntities = this.createSearchEntity(facetName, termResponse); 
                    accum = [
                        ...accum,
                        ...projectSearchEntities
                    ];
                }
                else {
                    accum.push(this.createFileFacetTerm(facetName, termResponse));
                }
            });

            return accum;
        }, []);
    }

    /**
     * Map current set of selected search terms to query string format.
     *
     * Return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
     *
     * If there aren't any file filters, it's just { }, not { file: { } }
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string}
     */
    public marshallSearchTerms(searchTerms: SearchTerm[]): string {

        // Build up filter from selected search terms
        const filters = searchTerms
            .reduce((accum, searchTerm) => {

            let searchKey = searchTerm.getSearchKey();
            if ( !accum[searchKey] ) {
                accum[searchKey] = {
                    is: []
                };
            }
            accum[searchKey]["is"].push(searchTerm.getSearchValue());

            return accum;
        }, {});

        // empty object if it doesn't have any filters;
        const result = Object.keys(filters).length ? {file: filters} : {};
        return JSON.stringify(result);
    }

    /**
     * Create search terms for the specified term response. This covers all facets except the "project" facet, which
     * is handled by createSearchEntity. 
     *
     * @param {string} facetName
     * @param {TermResponse} termResponse
     * @returns {SearchTerm[]}
     */
    private createFileFacetTerm(facetName: string, termResponse: TermResponse): SearchTerm {

        return new SearchFileFacetTerm(facetName, this.bindSearchValue(termResponse), termResponse.count);
    }

    /**
     * Create search terms for the specified project facet. It is possible that multiple search terms are created for
     * the case where there is a collision in project names. That is, multiple projects have the same short name.
     *
     * @param {string} facetName
     * @param {TermResponse} termResponse
     * @returns {SearchTerm[]}
     */
    private createSearchEntity(facetName: string, termResponse: TermResponse): SearchTerm[] {

        const termName = this.bindSearchValue(termResponse);
        const searchKey = facetName === FileFacetName.PROJECT ? FileFacetName.PROJECT_ID : facetName; // Project IDs are nested under "project" term facet
        return (termResponse.projectId || []).reduce((accum, projectId) => {
            accum.push(new SearchEntity(searchKey, projectId, termName, 1));
            return accum;
        }, []);
    }

    /**
     * Default value to "Unspecified" if not specified
     * 
     * @param {TermResponse} termResponse
     * @returns {string}
     */
    private bindSearchValue(termResponse: TermResponse): string {

        return this.termResponseService.bindTermName(termResponse);
    }
}
