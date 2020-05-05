/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when selected age range is to be removed from the set of selected search terms.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { AgeRange } from "../../facet/facet-age-range/age-range.model";
import { SearchAgeRange } from "../../search/search-age-range.model";
import { SearchTermAction } from "./search-term.action";

export class ClearSelectedAgeRangeAction implements Action, SearchTermAction {
    
    public static ACTION_TYPE = "FILE.SEARCH.CLEAR_SELECTED_AGE_RANGE";
    public readonly type = ClearSelectedAgeRangeAction.ACTION_TYPE;

    /**
     * @param {string} facetName
     * @param {AgeRange} ageRange
     */
    constructor(public readonly facetName: string,
                public readonly ageRange: AgeRange) {}

    /**
     * Returns selected file facet term in search term format.
     *
     * @returns {SearchAgeRange}
     */
    public asSearchTerm(): SearchAgeRange {

        return new SearchAgeRange(this.facetName, this.ageRange);
    }
}
