/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when matrix partial query match status is to be cleared from the store.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearMatrixPartialQueryMatchAction implements Action {
    public static ACTION_TYPE = "FILE.CLEAR_MATRIX_PARTIAL_QUERY_MATCH";
    public readonly type = ClearMatrixPartialQueryMatchAction.ACTION_TYPE;
    constructor() {}
}
