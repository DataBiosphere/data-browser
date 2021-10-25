/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary to populate file type form during selected data or project downloads, has been
 * requested and successfully returned from the endpoint API. The file type summaries are pulled from the file summary
 * response.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileTypeSummary } from "../../file-summary/file-type-summary.model";

export class FetchFileManifestFileTypeSummariesSuccessAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.FETCH_FILE_TYPE_SUMMARIES_SUCCESS";
    public readonly type = FetchFileManifestFileTypeSummariesSuccessAction.ACTION_TYPE;
    constructor(public readonly fileTypeSummaries: FileTypeSummary[]) {}
}
