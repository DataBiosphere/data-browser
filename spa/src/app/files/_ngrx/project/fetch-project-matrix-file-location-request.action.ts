/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project matrix file location download or copy to clipboard is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { FileLocationTrigger } from "../../file-location/file-location-trigger.model";
import { ProjectMatrixType } from "../../project-matrix/project-matrix-type.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { Project } from "../../shared/project.model";

export class FetchProjectMatrixFileLocationRequestAction implements Action, TrackingAction {

    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_MATRIX_FILE_LOCATION_REQUEST";
    public readonly type = FetchProjectMatrixFileLocationRequestAction.ACTION_TYPE;

    constructor(public readonly project: Project,
                public readonly projectUrl: string,
                public readonly projectMatrixType: ProjectMatrixType,
                public readonly fileUrl: string,
                public readonly fileName: string,
                public readonly trigger: FileLocationTrigger) {}

    /**
     * Return the file location request action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog}): GAEvent {

        // Currently only two types of matrices - CGM and DCP
        let relatedEntityType;
        if ( this.projectMatrixType === ProjectMatrixType.CGM ) {
            relatedEntityType = GAEntityType.PROJECT_CGM_MATRIX;
        }
        else {
            relatedEntityType = GAEntityType.PROJECT_DCP_MATRIX;
        }

        let action;
        if ( this.trigger === FileLocationTrigger.DOWNLOAD ) {
            action = GAAction.DOWNLOAD_PROJECT_MATRIX
        }
        else {
            action = GAAction.COPY_PROJECT_MATRIX
        }

        return {
            category: GACategory.PROJECT,
            action,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.ENTITY_URL]: this.projectUrl,
                [GADimension.RELATED_ENTITY_ID]: this.fileName,
                [GADimension.RELATED_ENTITY_TYPE]: relatedEntityType,
                [GADimension.RELATED_ENTITY_URL]: this.fileUrl
            }
        }
    }
}
