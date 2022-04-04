/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Search-related HTTP functionality, including the selection and querying of file data, and parsing of file responses.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { SearchTerm } from "../search-term.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { Dictionary } from "../../../dictionary";
import { ResponseFacet } from "../../http/response-facet.model";
import { ResponseTerm } from "../../http/response-term.model";
import { SearchFacetTerm } from "../search-facet-term.model";
import { SearchEntity } from "../search-entity.model";
import { ResponseTermService } from "../../http/response-term.service";
import { SearchAgeRange } from "../search-age-range.model";

@Injectable()
export class SearchTermHttpService {
    // Facet search allow list
    private ACCEPT_SEARCH_FACETS = [
        "biologicalSex",
        "cellLineType",
        "developmentStage",
        "donorDisease",
        "fileFormat",
        "fileSource",
        "genusSpecies",
        "institution",
        "instrumentManufacturerModel",
        "libraryConstructionApproach",
        "modelOrgan",
        "modelOrganPart",
        "nucleicAcidSource",
        "pairedEnd",
        "preservationMethod",
        "project",
        "projectTitle",
        "publicationTitle",
        "sampleDisease",
        "sampleEntityType",
        "selectedCellType",
        "specimenDisease",
        "specimenOrgan",
        "specimenOrganPart",
        "workflow",
    ];

    /**
     * @param {ResponseTermService} termResponseService
     */
    constructor(private termResponseService: ResponseTermService) {}

    /**
     * Create search terms for each term facet, for each facet, in the specified response.
     *
     * Note, age range facet is created manually with its state stored locally; there is no corresponding facet returned
     * from the backend for it. We do not want to search over age range so we are not adding any handling of it here.
     *
     * @param {Dictionary<ResponseFacet>} responseFacetsByName
     * @returns {SearchTerm[]}
     */
    public bindSearchTerms(
        responseFacetsByName: Dictionary<ResponseFacet>
    ): SearchTerm[] {
        return Object.keys(responseFacetsByName).reduce((accum, facetName) => {
            // Only create search terms for the allowed file facets
            if (this.ACCEPT_SEARCH_FACETS.indexOf(facetName) >= 0) {
                // Search entities (ie terms for project facet) are handled separately as we do not want to search over
                // these values
                const responseFacet = responseFacetsByName[facetName];
                responseFacet.terms.forEach((termResponse: ResponseTerm) => {
                    accum.push(
                        this.createSearchFacetTerm(facetName, termResponse)
                    );
                });
            }

            return accum;
        }, []);
    }

    /**
     * Create search entities from the project facet specified in the response.
     *
     * @param {Dictionary<ResponseFacet>} responseFacetsByName
     * @returns {SearchTerm[]}
     */
    public bindSearchEntities(
        responseFacetsByName: Dictionary<ResponseFacet>
    ): SearchTerm[] {
        const projectFacet = responseFacetsByName[FileFacetName.PROJECT];
        return projectFacet.terms.reduce(
            (accum, termResponse: ResponseTerm) => {
                // Convert the facet name PROJECT to the search key PROJECT_ID
                const projectSearchEntities = this.createSearchEntity(
                    FileFacetName.PROJECT_ID,
                    termResponse
                );
                accum = [...accum, ...projectSearchEntities];

                return accum;
            },
            []
        );
    }

    /**
     * Map current set of selected search terms to query string format.
     *
     * Return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
     *
     * If there aren't any file filters, it's just { }.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string}
     */
    public marshallSearchTerms(searchTerms: SearchTerm[]): string {
        // Build up filter from selected search terms
        const filters = searchTerms.reduce((accum, searchTerm) => {
            const searchKey = searchTerm.getSearchKey();
            const operator =
                searchTerm instanceof SearchAgeRange ? "intersects" : "is";
            if (!accum[searchKey]) {
                accum[searchKey] = {
                    [operator]: [],
                };
            }
            accum[searchKey][operator].push(
                searchTerm.getFilterParameterValue()
            );

            return accum;
        }, {});

        // empty object if it doesn't have any filters;
        const result = Object.keys(filters).length ? filters : {};
        return JSON.stringify(result);
    }

    /**
     * Create search terms for the specified term response. This covers all fileFacets except the "project" facet, which
     * is handled by createSearchEntity.
     *
     * @param {string} facetName
     * @param {ResponseTerm} termResponse
     * @returns {SearchTerm[]}
     */
    private createSearchFacetTerm(
        facetName: string,
        termResponse: ResponseTerm
    ): SearchTerm {
        return new SearchFacetTerm(
            facetName,
            this.bindSearchValue(termResponse),
            termResponse.count
        );
    }

    /**
     * Create search terms for the specified project facet. It is possible that multiple search terms are created for
     * the case where there is a collision in project names. That is, multiple projects have the same short name.
     *
     * @param {string} searchKey
     * @param {ResponseTerm} termResponse
     * @returns {SearchTerm[]}
     */
    private createSearchEntity(
        searchKey: string,
        termResponse: ResponseTerm
    ): SearchTerm[] {
        const termName = this.bindSearchValue(termResponse);
        return (termResponse.projectId || []).reduce((accum, projectId) => {
            accum.push(new SearchEntity(searchKey, projectId, termName, 1));
            return accum;
        }, []);
    }

    /**
     * Default value to "Unspecified" if not specified
     *
     * @param {ResponseTerm} termResponse
     * @returns {string}
     */
    private bindSearchValue(termResponse: ResponseTerm): string {
        return this.termResponseService.bindTermName(termResponse);
    }
}
