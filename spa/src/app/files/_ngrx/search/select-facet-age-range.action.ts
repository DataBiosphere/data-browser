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
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

export class SelectFacetAgeRangeAction implements Action, SearchTermAction, TrackingAction {

    public static ACTION_TYPE = "FILE.SEARCH.SELECT_AGE_RANGE";
    public readonly type = SelectFacetAgeRangeAction.ACTION_TYPE;

    /**
     * @param {string} facetName
     * @param {AgeRange} ageRange
     * @param {GASource} source
     */
    constructor(public readonly facetName: string,
                public readonly ageRange: AgeRange,
                public source: GASource) {}

    /**
     * Return the de/selected term as a GA event.
     *
     * @param {string} currentQuery
     * @returns {GAEvent}
     */
    public asEvent(currentQuery: string): GAEvent {

        const term = this.asSearchTerm().getDisplayValue();
        return {
            category: GACategory.SEARCH,
            action: GAAction.SELECT, // Always SELECT for this action (see ClearSelectedAgeRangeAction for DESELECT
            label: term,
            dimensions: {
                [GADimension.CURRENT_QUERY]: currentQuery,
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
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {

        return new SearchAgeRange(this.facetName, this.ageRange);
    }
}
