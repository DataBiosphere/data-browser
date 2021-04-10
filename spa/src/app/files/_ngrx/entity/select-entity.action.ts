/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when tab is selected (eg Projects, Files or Samples).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class SelectEntityAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "ENTITY.SELECT";
    public readonly type = SelectEntityAction.ACTION_TYPE;

    /**
     * @param {string} entityKey
     */
    constructor(public entityKey: string) {}

    /**
     * Return the cleared age range action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery}): GAEvent {

        return {
            category: GACategory.ENTITY,
            action: this.getTrackingAction(),
            label: this.entityKey.charAt(0).toUpperCase() + this.entityKey.slice(1), // Capitalize first letter of entity
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery
            }
        };
    }

    /**
     * Return the tracking event action for this action. 
     * 
     * @returns {GAAction}
     */
    protected getTrackingAction(): GAAction {
        return GAAction.SELECT_TAB;
    }
}
