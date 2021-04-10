/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when a link to a project supplementary link is clicked. 
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GARelatedEntityType } from "../../../shared/analytics/ga-related-entity-type.model";

export class ViewProjectSupplementaryLinkAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "PROJECT.VIEW_SUPPLEMENTARY_LINK";
    public readonly type = ViewProjectSupplementaryLinkAction.ACTION_TYPE;

    /**
     * @param {string} supplementaryLink
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {string} projectUrl
     */
    constructor(public supplementaryLink: string,
                public projectId: string,
                public projectShortname: string,
                public projectUrl: string) {}

    /**
     * Return the project integration action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery}): GAEvent {

        return {
            category: GACategory.PROJECT,
            action: GAAction.VIEW_EXTERNAL_RESOURCE,
            label: this.projectShortname,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_ID]: this.projectId,
                [GADimension.ENTITY_URL]: this.projectUrl,
                [GADimension.RELATED_ENTITY_ID]: this.supplementaryLink,
                [GADimension.RELATED_ENTITY_TYPE]: GARelatedEntityType.SUPPLEMENTARY_LINK,
                [GADimension.RELATED_ENTITY_URL]: this.supplementaryLink
            }
        };
    }
}
