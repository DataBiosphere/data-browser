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
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

export class ClearSelectedAgeRangeAction implements Action, SearchTermAction, TrackingAction {
    
    public static ACTION_TYPE = "FILE.SEARCH.CLEAR_SELECTED_AGE_RANGE";
    public readonly type = ClearSelectedAgeRangeAction.ACTION_TYPE;

    /**
     * @param {string} facetName
     * @param {AgeRange} ageRange
     * @param {GASource} source
     * @param {string} currentQuery
     */
    constructor(public readonly facetName: string,
                public readonly ageRange: AgeRange,
                public source: GASource,
                public currentQuery: string) {}

    /**
     * Return the cleared age range action as a GA event.
     *
     * @returns {GAEvent}
     */
    public asEvent(): GAEvent {

        const term = this.asSearchTerm().getDisplayValue();
        return {
            category: GACategory.SEARCH,
            action: GAAction.DESELECT, // Always DESELECT for this action (see SelectSelectedAgeRangeAction for SELECT)
            label: term,
            dimensions: {
                [GADimension.CURRENT_QUERY]: this.currentQuery,
                [GADimension.ENTITY_TYPE]: GAEntityType.FACET,
                [GADimension.FACET]: this.facetName,
                [GADimension.MAX]: `${this.ageRange.ageMax}`,
                [GADimension.MIN]: `${this.ageRange.ageMin}`,
                [GADimension.SOURCE]: this.source,
                [GADimension.TERM]: term
            }
        };
    }

    /**
     * Returns selected file facet term in search term format.
     *
     * @returns {SearchAgeRange}
     */
    public asSearchTerm(): SearchAgeRange {

        return new SearchAgeRange(this.facetName, this.ageRange);
    }
}
