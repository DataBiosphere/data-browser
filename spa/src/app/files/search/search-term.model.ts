/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of value selected to filter the file facets and/or entity search results.
 */

// App dependencies
import { TermSortable } from "../sort/term-sortable.model";

export interface SearchTerm extends TermSortable {

    /**
     * Return the count.
     * 
     * @returns {number}
      */    
    getCount(): number;

    /**
     * Return value to be used when displaying the search term.
     *
     * @returns {string}
     */
    getDisplayValue(): string;

    /**
     * Return a unique value to identify this search term by - used when iterating through sets of search terms that are
     * grouped by facet name or entity name.
     *
     * @returns {string}
     */
    getId(): string;

    /**
     * Return the raw, un-formatted value for this term.
     */
    getName(): string;

    /**
     * Return value to be used as the key when searching for this term.
     *
     * @returns {string}
     */
    getSearchKey(): string;

    /**
     * Return value to be used when searching for this term.
     *
     * @returns {string}
     */
    getSearchValue(): string;
}


