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
import { DefaultFilterInitAction } from "./default-filter-init.action";

export function reducer(state: InitState = InitState.getDefaultState(), action: Action): InitState {

    switch (action.type) {

        // Update state to indicate default app filter has been initialized
        case DefaultFilterInitAction.ACTION_TYPE:
            return state.setDefaultFilterInit();

        default:
            return state;
    }
}
