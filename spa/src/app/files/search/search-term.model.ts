/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of value selected to filter facets and/or entity search results. It is essentially a key/value pair with
 * additional convenience methods for identifying the search term, as well as methods for display.
 *
 * The key/value pair accessors are getSearchKey and getSearchValue.
 *
 * The ID accessor getId is used when iterating over sets of search terms that are grouped by facet and term
 * (search key and search term). The ID is never used when marshalling or parsing search terms for request/response
 * functionality.
 *
 * getCount is used purely for the search autosuggest and is therefore optional when building search terms from selected
 * facets.
 *
 * TODO:
 * Can we split SearchTerm into SelectableSearchTerm and SelectedSearchTerm concepts, where one models a search term
 * option to be included in the search autosuggest (and includes the getCount method) and the other models a facet value
 * that has been selected? This will eliminate the need to include getCount for SearchTerm values that don't need it.
 */

// App dependencies
import { TermSortable } from "../sort/term-sortable.model";

export interface SearchTerm extends TermSortable {
    /**
     * Return the count. Only required when setting up search terms options for select from search box (and not when
     * when setting up search terms from selected facets.
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
     * Return a unique value to identify this search term by - convenience method, used when iterating through sets of
     * search terms that are grouped by facet name or entity name.
     *
     * @returns {string}
     */
    getId(): string;

    /**
     * Return value to be used as the key when searching for this term.
     *
     * @returns {string}
     */
    getSearchKey(): string;

    /**
     * Return the core value of this search term. This value is used internally to check equality, as well as when
     * updating the filter query string parameter on facet selection.
     *
     * @returns {string}
     */
    getSearchValue(): any;

    /**
     * Return the value to be used when building up query string filter value. This value is not used when updating the
     * location according to the set of selected facets. The location is updated with the front-end representation of
     * the selected set of facets whereas this method translates the front-end representation when facets are marshalled
     * for request functionality.
     *
     * @returns {any}
     */
    getFilterParameterValue(): any;
}
