/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when project accession is clicked.
 */

// App dependencies
import { Action } from "@ngrx/store";

// Core dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";

export class ViewProjectAccessionAction implements Action, TrackingAction {
    public static ACTION_TYPE = "PROJECT.VIEW_PROJECT_ACCESSION";
    public readonly type = ViewProjectAccessionAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     * @param {string} projectTitle
     * @param {string} accession
     * @param {string} accessionUrl
     */
    constructor(
        public projectId: string,
        public projectTitle: string,
        public accession: string,
        public accessionUrl: string
    ) {}

    /**
     * Return the view accession action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog }): GAEvent {
        return {
            category: GACategory.PROJECT,
            action: GAAction.VIEW_PROJECT_ACCESSION,
            label: this.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.projectId,
                [GADimension.RELATED_ENTITY_ID]: this.accession,
                [GADimension.RELATED_ENTITY_TYPE]:
                    GAEntityType.PROJECT_ACCESSION,
                [GADimension.RELATED_ENTITY_URL]: this.accessionUrl,
            },
        };
    }
}
