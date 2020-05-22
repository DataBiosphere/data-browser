/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of system-related reducers.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SystemState } from "./system.state";
import { SystemStatusRequestAction } from "./system-status-request.action";
import { SystemStatusSuccessAction } from "./system-status-success.action";

export function reducer(state: SystemState = SystemState.getDefaultState(), action: Action): SystemState {

    switch (action.type) {

        // System status check has been requested - return current state while we're waiting for a response
        case SystemStatusRequestAction.ACTION_TYPE:
            return state.onSystemStatusRequested();

        // System status has been successfully retrieved from the backend
        case SystemStatusSuccessAction.ACTION_TYPE:
            return state.onSystemStatusReceived(action as SystemStatusSuccessAction);

        default:
            return state;
    }
}
