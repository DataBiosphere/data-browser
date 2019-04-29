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
     * @param {string} termName
     * @param {number} count - only required when setting up search terms for select from search box (and not when actually selecting a term)
     */
    constructor(private readonly facetName: string, private readonly termName: string, private readonly count?: number) {}

    /**
     * Return the count.
     *
     * @returns {number}
     */
    public getCount(): number {

        return this.count;
    }

    /**
     * The display value of a file facet search term is the term name.
     *
     * @returns {string}
     */
    public getDisplayValue(): string {

        return this.termName;
    }

    /**
     * Return a unique value to identify this search term by.
     *
     * @returns {string}
     */
    getId(): string {

        return `${this.getSearchKey()}:${this.getSearchValue()}`;
    }

    /**
     * The search key of a file facet term is its facet name.
     *
     * @returns {string}
     */
    public getSearchKey(): string {

        return this.facetName;
    }

    /**
     * The search value of a file facet term is its name. Returns "null" if term name is "Unspecified".
     *
     * @returns {string}
     */
    public getSearchValue(): string {

        if ( this.termName === "Unspecified" ) {
            return "null";
        }

        return this.termName;
    }

    /**
     * The sort value of a search file facet term is its term name;
     *
     * @returns {string}
     */
    public getSortValue(): string {

        return this.termName;
    }
}


