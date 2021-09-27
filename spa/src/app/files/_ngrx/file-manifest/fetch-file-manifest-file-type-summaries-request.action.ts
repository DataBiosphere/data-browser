/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary to populate file type form during selected data or project downloads, has been
 * requested from endpoint API. The file type summaries are pulled from the file summary response.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchFileManifestFileTypeSummariesRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST.FETCH_FILE_TYPE_SUMMARIES_REQUEST";
    public readonly type = FetchFileManifestFileTypeSummariesRequestAction.ACTION_TYPE;
    constructor() {}
}

