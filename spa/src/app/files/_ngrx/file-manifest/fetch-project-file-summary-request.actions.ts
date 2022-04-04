/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project-specific file summary is requested for populating ride side stats on project file
 * downloads.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectFileSummaryRequestAction implements Action {
    public static ACTION_TYPE =
        "FILE_MANIFEST.FETCH_PROJECT_FILE_SUMMARY_REQUEST";
    public readonly type = FetchProjectFileSummaryRequestAction.ACTION_TYPE;
}
