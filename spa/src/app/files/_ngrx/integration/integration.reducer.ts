/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer responsible for updating integrations-related state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { IntegrationState } from "./integration.state";
import { FetchIntegrationsByProjectIdRequestAction } from "./fetch-integrations-by-project-id-request.action";
import { FetchIntegrationsByProjectIdSuccessAction } from "./fetch-integrations-by-project-id-success.action";

export function reducer(state: IntegrationState = IntegrationState.getDefaultState(), action: Action): IntegrationState {

    switch (action.type) {

        case FetchIntegrationsByProjectIdRequestAction.ACTION_TYPE:
            return state.fetchIntegrationsByProjectIdRequest();

        case FetchIntegrationsByProjectIdSuccessAction.ACTION_TYPE:
            return state.fetchIntegrationsByProjectIdSuccess(action as FetchIntegrationsByProjectIdSuccessAction);

        default:
            return state;
    }
}
