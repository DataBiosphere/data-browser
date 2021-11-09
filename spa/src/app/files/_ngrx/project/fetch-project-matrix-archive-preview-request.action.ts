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
import { ProjectMatrixType } from "../../project-matrix/project-matrix-type.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { Project } from "../../shared/project.model";

export class FetchProjectMatrixArchivePreviewRequestAction implements Action, TrackingAction {

    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_MATRIX_ARCHIVE_PREVIEW_REQUEST";
    public readonly type = FetchProjectMatrixArchivePreviewRequestAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {string} matrixId
     * @param {ProjectMatrixType} projectMatrixType
     */
    constructor(public readonly project: Project,
                public readonly matrixId: string,
                public readonly matrixVersion: string,
                public readonly projectMatrixType: ProjectMatrixType) {}

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

        return {
            category: GACategory.PROJECT,
            action: GAAction.VIEW_MATRIX_ARCHIVE_PREVIEW,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.RELATED_ENTITY_ID]: this.matrixId,
                [GADimension.RELATED_ENTITY_TYPE]: relatedEntityType
            }
        }
    }
}
