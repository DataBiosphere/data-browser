/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project matrix file archive preview is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ArchiveFile } from "../../project-matrix/archive-file.model";

export class FetchProjectMatrixArchivePreviewSuccessAction implements Action {

    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_MATRIX_ARCHIVE_PREVIEW_SUCCESS";
    public readonly type = FetchProjectMatrixArchivePreviewSuccessAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     * @param {string} matrixId
     * @param {ArchiveFile[]} archiveFiles
     */
    constructor(public readonly projectId: string,
                public readonly matrixId: string,
                public readonly archiveFiles: ArchiveFile[]) {}
}
