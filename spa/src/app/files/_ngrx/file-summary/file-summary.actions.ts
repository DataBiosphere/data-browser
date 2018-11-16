/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File summary-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchFileSummaryRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_SUMMARY.FETCH_REQUEST";
    public readonly type = FetchFileSummaryRequestAction.ACTION_TYPE;
    constructor() {}
}

export class FetchFileSummarySuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_SUMMARY.FETCH_SUCCESS";
    public readonly type = FetchFileSummarySuccessAction.ACTION_TYPE;
    constructor(public readonly fileSummary) {}
}

/**
 * Action dispatched when file summary is to be requested to populate file type summaries on manifest modal. Include
 * all selected facets except any selected file types, in request.
 */
export class FetchManifestDownloadFileSummaryRequestAction implements Action {
    public static ACTION_TYPE = "FILE.MANIFEST_DOWNLOAD_FILE_SUMMARY.FETCH_REQUEST";
    public readonly type = FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE;
    constructor() {}
}

/**
 * Action dispatched when file summary to populate file type summaries on manifest modal, has been requested and 
 * successfully returned from the endpoint API.
 */
export class FetchManifestDownloadFileSummarySuccessAction implements Action {
    public static ACTION_TYPE = "FILE.MANIFEST_DOWNLOAD_FILE_SUMMARY.FETCH_SUCCESS";
    public readonly type = FetchManifestDownloadFileSummarySuccessAction.ACTION_TYPE;
    constructor(public readonly fileSummary) {}
}

export type All
    = FetchFileSummaryRequestAction
    | FetchFileSummarySuccessAction
    | FetchManifestDownloadFileSummaryRequestAction
    | FetchManifestDownloadFileSummarySuccessAction;
