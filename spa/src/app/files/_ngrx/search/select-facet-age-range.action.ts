/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when file facet term is selected. Select can be dispatched from facet card itself or from
 * corresponding term menu displayed over facet card (this includes search fileFacets and their menus).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { AgeRange } from "../../facet/facet-age-range/age-range.model";
import { SearchAgeRange } from "../../search/search-age-range.model";
import { SearchTermAction } from "./search-term.action";
import { SearchTerm } from "../../search/search-term.model";

export class SelectFacetAgeRangeAction implements Action, SearchTermAction {

    public static ACTION_TYPE = "FILE.SEARCH.SELECT_AGE_RANGE";
    public readonly type = SelectFacetAgeRangeAction.ACTION_TYPE;

    /**
     * @param {string} facetName
     * @param {AgeRange} ageRange
     */
    constructor(public readonly facetName: string,
                public readonly ageRange: AgeRange) {}

    /**
     * Returns selected file facet term in search term format.
     *
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {

        return new SearchAgeRange(this.facetName, this.ageRange);
    }
}
