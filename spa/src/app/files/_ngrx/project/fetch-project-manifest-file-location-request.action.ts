/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when requested project manifest file location is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { FileLocationTrigger } from "../../file-location/file-location-trigger.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { Project } from "../../shared/project.model";

export class FetchProjectManifestFileLocationRequestAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_MANIFEST_FILE_LOCATION_REQUEST";
    public readonly type = FetchProjectManifestFileLocationRequestAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {string} projectUrl
     * @param {FileLocationTrigger} trigger
     */
    constructor(public readonly project: Project, public projectUrl: string, public trigger: FileLocationTrigger) {}


    /**
     * Return the request action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog}): GAEvent {

        let action;
        if ( this.trigger === FileLocationTrigger.DOWNLOAD ) {
            action = GAAction.DOWNLOAD_PROJECT_MANIFEST
        }
        else {
            action = GAAction.COPY_PROJECT_MANIFEST
        }

        return {
            category: GACategory.PROJECT,
            action: action,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.ENTITY_URL]: this.projectUrl,
                [GADimension.RELATED_ENTITY_TYPE]: GAEntityType.PROJECT_MANIFEST
            }
        };
    }
}
