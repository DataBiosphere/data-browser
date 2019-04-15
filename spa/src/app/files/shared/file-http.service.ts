/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HTTP-related functionality specific to the selection and querying of file data.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { FileFacet } from "./file-facet.model";
import { SearchTerm } from "../search/search-term.model";

@Injectable()
export class FileHttpService {

    /**
     * Map current set of selected search terms to query string format.
     *
     * return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
     * if there aren't any file filters, it's just { }, not { file: { } }
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string}
     */
    public marshallSelectedFacets(searchTerms: SearchTerm[]): string {

        // Build up filter from selected search terms
        const filters = searchTerms.reduce((accum, searchTerm) => {

            let facetName = searchTerm.facetName;
            if ( !accum[facetName] ) {
                accum[facetName] = {
                    is: []
                };
            }
            accum[facetName]["is"].push(searchTerm.getSearchKey());

            return accum;
        }, {});

        // empty object if it doesn't have any filters;
        const result = Object.keys(filters).length ? {file: filters} : {};
        return JSON.stringify(result);
    }

}
