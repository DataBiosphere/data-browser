/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when request to fetch matrix partial query status has successfully completed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchMatrixPartialQueryMatchSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_MATRIX_PARTIAL_QUERY__MATCHSUCCESS";
    public readonly type = FetchMatrixPartialQueryMatchSuccessAction.ACTION_TYPE;
    constructor(public readonly partialQueryMatch: boolean) {}
}

