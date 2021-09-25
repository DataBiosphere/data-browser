/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary is requested, to populate file type form on project file download pages. 
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchFileManifestProjectFileTypeSummariesRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST.FETCH_PROJECT_FILE_TYPE_SUMMARIES_REQUEST";
    public readonly type = FetchFileManifestProjectFileTypeSummariesRequestAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     */
    constructor(public readonly projectId: string) {}
}

