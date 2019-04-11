/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when file facet term or entity is selected.
 */

// App dependencies
import { SearchTerm } from "../../search/search-term.model";

export interface SelectSearchTermAction {

    facetName: string;
    selected: boolean;

    /**
     * Return action in the format of a search term.
     *
     * @returns {string}
     */
    asSearchTerm(): SearchTerm;

    /**
     * Return value to be used as a key when finding and updating file facet terms.
     *
     * @returns {string}
     */
    getTermKey(): string;
}
