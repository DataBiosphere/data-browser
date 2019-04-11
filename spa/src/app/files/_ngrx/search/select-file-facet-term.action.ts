/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when file facet term is selected. Select can be dispatched from facet card itself or from
 * corresponding term menu displayed over facet card (this includes search facets and their menus).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SearchFileFacetTerm } from "../../search/search-file-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import { SelectSearchTermAction } from "./select-search-term.action";

export class SelectFileFacetTermAction implements Action, SelectSearchTermAction {

    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.SELECT_FACET";
    public readonly type = SelectFileFacetTermAction.ACTION_TYPE;

    /**
     * @param {string} facetName
     * @param {string} termName
     * @param {boolean} selected
     */
    constructor(public readonly facetName: string,
                public readonly termName: string,
                public readonly selected = true) {}

    /**
     * Returns selected file facet term in search term format.
     *
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {

        return new SearchFileFacetTerm(this.facetName, this.termName);
    }

    /**
     * They key of a facet file term is its name.
     */
    public getTermKey(): string {

        return this.termName;
    }
}
