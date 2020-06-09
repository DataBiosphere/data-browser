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
     * @param {string} currentQuery
     * @returns {GAEvent}
     */
    public asEvent(currentQuery: string): GAEvent {

        return {
            category: GACategory.ENTITY,
            action: this.getTrackingAction(),
            label: this.entityKey,
            dimensions: {
                [GADimension.CURRENT_QUERY]: currentQuery,
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
