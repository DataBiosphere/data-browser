/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project matrix archive previews are to be cleared from store, usually on navigation away from
 * project matrices view.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearProjectMatrixArchivePreviewAction implements Action {

    public static ACTION_TYPE = "PROJECT.CLEAR_PROJECT_MATRIX_ARCHIVE_PREVIEW";
    public readonly type = ClearProjectMatrixArchivePreviewAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     */
    constructor(public projectId: string) {}
}
