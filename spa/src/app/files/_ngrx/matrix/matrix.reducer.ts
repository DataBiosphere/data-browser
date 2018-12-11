/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Reducer handling matrix-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FetchMatrixFileFormatsRequestAction, FetchMatrixFileFormatsSuccessAction } from "./matrix.actions";
import { MatrixState } from "./matrix.state";

export function reducer(state: MatrixState = MatrixState.getDefaultState(), action: Action): MatrixState {

    switch (action.type) {

        case FetchMatrixFileFormatsRequestAction.ACTION_TYPE:
            return state.fetchMatrixFileFormatsRequest();

        case FetchMatrixFileFormatsSuccessAction.ACTION_TYPE:
            return state.fetchMatrixFileFormatsSuccess(action as FetchMatrixFileFormatsSuccessAction);

        default:
            return state;
    }
}
