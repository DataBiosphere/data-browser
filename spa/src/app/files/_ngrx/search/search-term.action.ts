/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of action triggered when file facet, facet age range or entity is selected.
 */

// App dependencies
import { SearchTerm } from "../../search/search-term.model";

export interface SearchTermAction {
    /**
     * Return action in the format of a search term.
     *
     * @returns {string}
     */
    asSearchTerm(): SearchTerm;
}
