/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when all selected facet terms are to be removed and default state is restored.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

export class ClearSelectedTermsAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "FILE.SEARCH.CLEAR_SELECTED_TERMS";
    public readonly type = ClearSelectedTermsAction.ACTION_TYPE;

    /**
     * @param {GASource} source
     */
    constructor(public source: GASource) {}

    /**
     * Return the clear action as a GA event.
     *
     * @param {string} currentQuery
     * @returns {GAEvent}
     */
    public asEvent(currentQuery: string): GAEvent {

        return {
            category: GACategory.SEARCH,
            action: GAAction.CLEAR,
            label: "Clear All",
            dimensions: {
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_TYPE]: GAEntityType.FACET,
                [GADimension.SOURCE]: this.source
            }
        };
    }
}
