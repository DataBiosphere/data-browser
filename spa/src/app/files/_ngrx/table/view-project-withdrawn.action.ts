/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when a withdrawn project is viewed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class ViewProjectWithdrawnAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "PROJECT.VIEW_PROJECT_WITHDRAWN";
    public readonly type = ViewProjectWithdrawnAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {string} projectUrl
     * @param {string} redirectUrl
     */
    constructor(public projectId: string,
                public projectShortname: string,
                public projectUrl: string,
                public redirectUrl: string) {}

    /**
     * Return the project integration action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery}): GAEvent {

        return {
            category: GACategory.PROJECT,
            action: GAAction.VIEW_WITHDRAWN_PROJECT,
            label: this.projectShortname,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_ID]: this.projectId,
                [GADimension.ENTITY_URL]: this.projectUrl,
                [GADimension.RELATED_ENTITY_URL]: this.redirectUrl
            }
        };
    }
}
