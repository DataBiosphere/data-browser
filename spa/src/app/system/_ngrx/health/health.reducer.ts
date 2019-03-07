/*
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Set of health-related reducers.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { HealthState } from "./health.state";
import { HealthSuccessAction } from "./health-success.action";
import { HealthRequestAction } from "./health-request.action";

export function reducer(state: HealthState = HealthState.getDefaultState(), action: Action): HealthState {

    switch (action.type) {

        // Health check has been requested - return current state while we're waiting for a response
        case HealthRequestAction.ACTION_TYPE:
            return state.healthCheckRequest();

        // System status has been successfully retrieved from the backend
        case HealthSuccessAction.ACTION_TYPE:
            return state.receiveHealth(action as HealthSuccessAction);

        default:
            return state;
    }
}
