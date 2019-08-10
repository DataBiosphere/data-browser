/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when matrixable search results have been successfully returned from the server and we can
 * determine if matrix is supported for the current search terms.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchIsMatrixSupportedSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_IS_MATRIX_SUPPORTED_SUCCESS";
    public readonly type = FetchIsMatrixSupportedSuccessAction.ACTION_TYPE;
    constructor(public readonly matrixableSearchResults: boolean) {}
}
