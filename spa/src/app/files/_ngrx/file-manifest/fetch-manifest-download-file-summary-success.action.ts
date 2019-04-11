/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary to populate file type summaries on manifest modal, has been requested and
 * successfully returned from the endpoint API.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchManifestDownloadFileSummarySuccessAction implements Action {
    public static ACTION_TYPE = "FILE.MANIFEST_DOWNLOAD_FILE_SUMMARY.FETCH_SUCCESS";
    public readonly type = FetchManifestDownloadFileSummarySuccessAction.ACTION_TYPE;
    constructor(public readonly fileSummary) {}
}
