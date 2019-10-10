/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of index-related reducers.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { IndexState } from "./index.state";
import { IndexSuccessAction } from "./index-success.action";
import { IndexRequestAction } from "./index-request.action";

export function reducer(state: IndexState = IndexState.getDefaultState(), action: Action): IndexState {

    switch (action.type) {

        // Index status has been requested - return current state while we're waiting for a response
        case IndexRequestAction.ACTION_TYPE:
            return state.indexStatusRequest();

        // Index status has been successfully retrieved from the backend
        case IndexSuccessAction.ACTION_TYPE:
            return state.receiveIndexStatus(action as IndexSuccessAction);

        default:
            return state;
    }
}
