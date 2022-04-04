/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
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

export type All = FetchFileSummaryRequestAction | FetchFileSummarySuccessAction;
