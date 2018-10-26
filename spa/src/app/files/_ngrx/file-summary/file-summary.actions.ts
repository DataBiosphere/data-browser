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
 * Action dispatched when overall, original, file summary is to be requested from the endpoint API.
 */
export class FetchUnfacetedFileSummaryRequestAction implements Action {
    public static ACTION_TYPE = "FILE.UNFACETED_FILE_SUMMARY.FETCH_REQUEST";
    public readonly type = FetchUnfacetedFileSummaryRequestAction.ACTION_TYPE;
    constructor() {}
}

/**
 * Action dispatched when overall, original, file summary has been requested and successfully returned from the endpoint
 * API.
 */
export class UnfacetedFetchFileSummarySuccessAction implements Action {
    public static ACTION_TYPE = "FILE.UNFACETED_FILE_SUMMARY.FETCH_SUCCESS";
    public readonly type = UnfacetedFetchFileSummarySuccessAction.ACTION_TYPE;
    constructor(public readonly fileSummary) {}
}

export type All
    = FetchFileSummaryRequestAction
    | FetchFileSummarySuccessAction
    | FetchUnfacetedFileSummaryRequestAction
    | UnfacetedFetchFileSummarySuccessAction;
