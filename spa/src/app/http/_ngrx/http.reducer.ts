/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HTTP reducer, handles actions related to handling HTTP state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { HttpState } from "./http.state";
import { ErrorResponseAction } from "./http-error-response.actions";
import { ClearErrorStateAction } from "./http-clear-state-error.actions";

/**
 * @param state {HttpState}
 * @param action {Action}
 * @returns {HttpState}
 */
export function reducer(state: HttpState = HttpState.getDefaultState(), action: Action): HttpState {

    switch (action.type) {

        // Handle case where error state is to be cleared.
        case ClearErrorStateAction.ACTION_TYPE:
            return state.clearErrorState(action as ClearErrorStateAction);

        // Handle case where error has been returned from the server.
        case ErrorResponseAction.ACTION_TYPE:
            return state.receiveErrorResponse(action as ErrorResponseAction);

        default:
            return state;
    }
}
