/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when a deprecated project is viewed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class ViewProjectDeprecatedAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "PROJECT.VIEW_PROJECT_DEPRECATED";
    public readonly type = ViewProjectDeprecatedAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {string} projectUrl
     */
    constructor(public projectId: string,
                public projectShortname: string,
                public projectUrl: string) {}

    /**
     * Return the project integration action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({currentQuery}): GAEvent {

        return {
            category: GACategory.PROJECT,
            action: GAAction.VIEW_DEPRECATED_PROJECT,
            label: this.projectShortname,
            dimensions: {
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_ID]: this.projectId,
                [GADimension.ENTITY_URL]: this.projectUrl
            }
        };
    }
}
