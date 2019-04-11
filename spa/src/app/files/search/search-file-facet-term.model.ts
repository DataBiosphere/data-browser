/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of selected file facet term.
 */

// App dependencies
import { SearchTerm } from "./search-term.model";

export class SearchFileFacetTerm implements SearchTerm {

    /**
     * @param {string} facetName
     * @param {string} name
     */
    constructor(public readonly facetName: string, public readonly name: string) {}

    /**
     * The key of a file facet term is its name. Returns "none" if term name is "Unspecified".
     *
     * @returns {string}
     */
    public getSearchKey(): string {

        if ( this.name === "Unspecified" ) {
            return "null";
        }

        return this.name;
    }
}


