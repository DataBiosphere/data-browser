/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project-specific file summary is requested for populating ride side stats on project file
 * downloads.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";

export class FetchProjectFileSummarySuccessAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.FETCH_PROJECT_FILE_SUMMARY_SUCCESS";
    public readonly type = FetchProjectFileSummarySuccessAction.ACTION_TYPE;
    constructor(public readonly fileSummary: FileSummary) {}
}
