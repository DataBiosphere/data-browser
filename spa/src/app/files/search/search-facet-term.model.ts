/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of selected facet term.
 */

// App dependencies
import { SearchTerm } from "./search-term.model";

export class SearchFacetTerm implements SearchTerm {
    /**
     * @param {string} facetName
     * @param {string} termName
     * @param {number} count - only required when setting up search terms for select from search box (and not when actually selecting a term)
     */
    constructor(
        private readonly facetName: string,
        private readonly termName: string,
        private readonly count?: number
    ) {}

    /**
     * Return the count. Only required when setting up search terms options for select from search box (and not when
     * when setting up search terms from selected facets.
     *
     * @returns {number}
     */
    public getCount(): number {
        return this.count;
    }

    /**
     * The display value of a facet search term is the term name.
     *
     * @returns {string}
     */
    public getDisplayValue(): string {
        return this.termName;
    }

    /**
     * Return a unique value to identify this search term by - convenience method, used when iterating through sets of
     * search terms that are grouped by facet name or entity name.
     *
     * @returns {string}
     */
    getId(): string {
        return `${this.getSearchKey()}:${this.getSearchValue()}`;
    }

    /**
     * The search key of a facet term is its facet name. This value is used when building the filter query string
     * parameter.
     *
     * @returns {string}
     */
    public getSearchKey(): string {
        return this.facetName;
    }

    /**
     * The search value of a facet term is its name. This value is used internally to check equality, as well as when
     * updating the filter query string parameter on facet selection.
     *
     * @returns {string}
     */
    public getSearchValue(): any {
        return this.termName;
    }

    /**
     * Return the value to be used when building up query string filter value. This value is not used when updating the
     * location according to the set of selected facets. The location is updated with the front-end representation of
     * the selected set of facets whereas this method translates the front-end representation when facets are marshalled
     * for request functionality.
     *
     * @returns {any}
     */
    public getFilterParameterValue(): any {
        if (this.termName === "Unspecified") {
            return null;
        }

        if (this.termName === "true") {
            return true;
        }

        if (this.termName === "false") {
            return false;
        }

        return this.termName;
    }

    /**
     * The sort value of a search facet term is its term name;
     *
     * @returns {string}
     */
    public getSortValue(): string {
        return this.termName;
    }
}
