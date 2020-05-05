/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when matrixable search results have been successfully returned from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearIsMatrixSupportedAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.CLEAR_IS_MATRIX_SUPPORTED";
    public readonly type = ClearIsMatrixSupportedAction.ACTION_TYPE;
    constructor() {}
}
