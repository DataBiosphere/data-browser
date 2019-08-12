/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when matrix partial query match status is to be displayed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchMatrixPartialQueryMatchRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_MATRIX_PARTIAL_QUERY_MATCH_REQUEST";
    public readonly type = FetchMatrixPartialQueryMatchRequestAction.ACTION_TYPE;
    constructor() {}
}
