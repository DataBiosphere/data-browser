/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Config reducer, handles actions related to retrieving/setting up config.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ConfigState } from "./config.state";
import { FetchConfigRequestSuccessAction } from "./config.actions";

/**
 * @param state {ConfigState}
 * @param action {Action}
 * @returns {ConfigState}
 */
export function reducer(
    state: ConfigState = ConfigState.getDefaultState(),
    action: Action
): ConfigState {
    switch (action.type) {
        // Handle case where config has been re/requested and updated config has been returned from end point
        case FetchConfigRequestSuccessAction.ACTION_TYPE:
            return state.receiveConfig(
                action as FetchConfigRequestSuccessAction
            );

        default:
            return state;
    }
}
