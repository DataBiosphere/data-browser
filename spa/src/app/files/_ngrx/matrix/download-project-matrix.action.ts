/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when project matrix is downloaded.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TrackingAction } from "../analytics/tracking.action";
import { ProjectMatrixType } from "../../project-matrix/project-matrix-type.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { Project } from "../../shared/project.model";

export class DownloadProjectMatrixAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "MATRIX.DOWNLOAD_PROJECT_MATRIX";
    public readonly type = DownloadProjectMatrixAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {string} projectUrl
     * @param {ProjectMatrixType} projectMatrixType
     * @param {string} fileName
     * @param {string} url
     */
    constructor(private readonly project: Project,
                private readonly projectUrl: string,
                private readonly projectMatrixType: ProjectMatrixType,
                private readonly fileName: string,
                private readonly url: string) {}

    /**
     * Return the matrix download action as a GA event.
     *
     * param {{[key: string]: any}} dimensions
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
            action: GAAction.DOWNLOAD_PROJECT_MATRIX,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.ENTITY_URL]: this.projectUrl,
                [GADimension.RELATED_ENTITY_ID]: this.fileName,
                [GADimension.RELATED_ENTITY_TYPE]: relatedEntityType,
                [GADimension.RELATED_ENTITY_URL]: this.url
            }
        }
    }
}
