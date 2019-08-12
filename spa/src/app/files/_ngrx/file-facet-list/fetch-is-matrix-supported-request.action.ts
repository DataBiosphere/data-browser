/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when we need to determine if the current search terms yield any matrixable data.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchIsMatrixSupportedRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_IS_MATRIX_SUPPORTED_REQUEST";
    public readonly type = FetchIsMatrixSupportedRequestAction.ACTION_TYPE;
    constructor() {}
}
