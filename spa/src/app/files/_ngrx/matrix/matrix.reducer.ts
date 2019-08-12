/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling matrix-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ClearMatrixPartialQueryMatchAction } from "./clear-matrix-partial-query-match.action";
import { FetchMatrixFileFormatsRequestAction } from "./fetch-matrix-file-formats-request.action";
import { FetchMatrixFileFormatsSuccessAction } from "./fetch-matrix-file-formats-success.action";
import { FetchMatrixPartialQueryMatchSuccessAction } from "./fetch-matrix-partial-query-match-success.action";
import { FetchMatrixUrlSuccessAction } from "./fetch-matrix-url-success.action";
import { FetchProjectMatrixUrlsSuccessAction } from "./fetch-project-matrix-urls-success.action";
import { CancelFetchMatrixUrlRequestAction } from "./cancel-fetch-matrix-url-request.action";
import { MatrixState } from "./matrix.state";

export function reducer(state: MatrixState = MatrixState.getDefaultState(), action: Action): MatrixState {

    switch (action.type) {

        // Clear partial query status
        case ClearMatrixPartialQueryMatchAction.ACTION_TYPE:
            return state.clearMatrixPartialQueryStatus();

        case FetchMatrixFileFormatsRequestAction.ACTION_TYPE:
            return state.fetchMatrixFileFormatsRequest();

        case FetchMatrixFileFormatsSuccessAction.ACTION_TYPE:
            return state.fetchMatrixFileFormatsSuccess(action as FetchMatrixFileFormatsSuccessAction);

        // Partial query status has been calculated
        case FetchMatrixPartialQueryMatchSuccessAction.ACTION_TYPE:
            return state.fetchMatrixPartialQueryStatusSuccessAction(action as FetchMatrixPartialQueryMatchSuccessAction);
            
        // Matrix URL request status has been updated
        case FetchMatrixUrlSuccessAction.ACTION_TYPE:
            return state.fetchMatrixUrlSuccess(action as FetchMatrixUrlSuccessAction);

        // Matrix URL request has been canceled
        case CancelFetchMatrixUrlRequestAction.ACTION_TYPE:
            return state.cancelMatrixUrlRequest();

        // Set of available matrix URLs has been retrieved from server
        case FetchProjectMatrixUrlsSuccessAction.ACTION_TYPE:
            return state.fetchProjectMatrixURLsSuccess(action as FetchProjectMatrixUrlsSuccessAction);

        default:
            return state;
    }
}
