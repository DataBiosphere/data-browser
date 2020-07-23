/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary is requested, to populate file type summaries on manifest download pages. Include
 * all selected facets except any selected file types, in request.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchManifestDownloadFileSummaryRequestAction implements Action {
    public static ACTION_TYPE = "FILE.MANIFEST_DOWNLOAD_FILE_SUMMARY.FETCH_REQUEST";
    public readonly type = FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE;
    constructor() {}
}

