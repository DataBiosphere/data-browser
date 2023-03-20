/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when existence of file is to be checked.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { FileLocationTrigger } from "../../file-location/file-location-trigger.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { TrackingAction } from "../analytics/tracking.action";
import { Project } from "../../shared/project.model";

export class FetchProjectFullManifestRequestAction
    implements Action, TrackingAction
{
    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_FULL_MANIFEST_REQUEST";
    public readonly type = FetchProjectFullManifestRequestAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {string} fileUrl
     * @param {string} fileName
     * @param {FileLocationTrigger} trigger
     */
    constructor(
        public readonly project: Project,
        public readonly fileUrl: string,
        public readonly fileName: string,
        public trigger: FileLocationTrigger
    ) {}

    /**
     * Return the request action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog }): GAEvent {
        let action;
        if (this.trigger === FileLocationTrigger.DOWNLOAD) {
            action = GAAction.DOWNLOAD_PROJECT_FULL_MANIFEST;
        } else {
            action = GAAction.COPY_PROJECT_FULL_MANIFEST;
        }

        return {
            category: GACategory.PROJECT,
            action: action,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.RELATED_ENTITY_ID]: this.fileName,
                [GADimension.RELATED_ENTITY_URL]: this.fileUrl,
                [GADimension.RELATED_ENTITY_TYPE]:
                    GAEntityType.PROJECT_FULL_MANIFEST,
            },
        };
    }
}
