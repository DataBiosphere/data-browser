/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling export to init-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { InitState } from "./init.state";

export function reducer(state: InitState = InitState.getDefaultState(), action: Action): InitState {

    switch (action.type) {

        default:
            return state;
    }
}
