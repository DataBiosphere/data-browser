/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling matrix-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FetchMatrixFileFormatsRequestAction } from "./fetch-matrix-file-formats-request.action";
import { FetchMatrixFileFormatsSuccessAction } from "./fetch-matrix-file-formats-success.action";
import { FetchMatrixUrlSuccessAction } from "./fetch-matrix-url-success.action";
import { MatrixState } from "./matrix.state";
import { CancelFetchMatrixUrlRequestAction } from "./cancel-fetch-matrix-url-request.action";
import { FetchProjectMatrixUrlsSuccessAction } from "./fetch-project-matrix-urls-success.action";

export function reducer(state: MatrixState = MatrixState.getDefaultState(), action: Action): MatrixState {

    switch (action.type) {

        case FetchMatrixFileFormatsRequestAction.ACTION_TYPE:
            return state.fetchMatrixFileFormatsRequest();

        case FetchMatrixFileFormatsSuccessAction.ACTION_TYPE:
            return state.fetchMatrixFileFormatsSuccess(action as FetchMatrixFileFormatsSuccessAction);

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
