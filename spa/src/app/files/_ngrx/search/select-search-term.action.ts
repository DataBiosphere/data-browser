/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when file facet term or entity is selected.
 */

// App dependencies
import { SearchTermAction } from "./search-term.action";

export interface SelectSearchTermAction extends SearchTermAction {

    selected: boolean;

    /**
     * Return value to be used as a key when finding and updating file facet terms.
     *
     * @returns {string}
     */
    getTermKey(): string;
}
