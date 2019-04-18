/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary to populate file type summaries on manifest modal is to be cleared (ie on close
 * of modal).
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearManifestDownloadFileSummaryAction implements Action {
    public static ACTION_TYPE = "FILE.MANIFEST_DOWNLOAD_FILE_SUMMARY.CLEAR";
    public readonly type = ClearManifestDownloadFileSummaryAction.ACTION_TYPE;
    constructor() {}
}
