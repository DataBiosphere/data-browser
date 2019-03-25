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

@Injectable()
export class FileHttpService {

    /**
     * Map current set of selected facets to query string format.
     *
     * return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
     * if there aren't any file filters, it's just { }, not { file: { } }
     *
     * @param {FileFacet[]} selectedFacets
     * @returns {string}
     */
    public marshallSelectedFacets(selectedFacets: FileFacet[]): string {

        const filters = selectedFacets.reduce((facetAcc, facet) => {

            // Paranoid check for no facets.
            if ( !facet.terms || !facet.terms.length ) {
                return facetAcc;
            }

            // Get set of selected term names for this facet, if any.
            const termNames = facet.selectedTerms.map((term) => {

                // Returns "none" if term name is "Unspecified".
                // TODO revisit - is this check still required?
                if ( term.name === "Unspecified" ) {
                    return "null";
                }

                return term.name;
            });

            // Only add the facet if there is a selected term.
            if ( termNames.length ) {
                facetAcc[facet.name] = {is: termNames};
            }

            return facetAcc;
        }, {});

        // Use empty object if there are no selected facets at this point in time.
        const result = Object.keys(filters).length ? {file: filters} : {};

        // Convert to query string.
        return JSON.stringify(result);
    }

}
