/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project matrix file locations are to be cleared from store, usually on navigation away from
 * project matrices view.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearProjectMatrixFileLocationsAction implements Action {

    public static ACTION_TYPE = "PROJECT.CLEAR_PROJECT_MATRIX_FILE_LOCATIONS";
    public readonly type = ClearProjectMatrixFileLocationsAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     */
    constructor(public projectId: string) {}
}
