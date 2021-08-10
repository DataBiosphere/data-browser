/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Terra auth reducer, handles actions related to handling Terra auth state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { LogoutSuccessAction } from "../../auth/_ngrx/logout-success.action";
import { TerraAuthInitAction } from "./terra-auth-init.action";
import { TerraAuthState } from "./terra-auth.state";
import { FetchTerraRegistrationSuccessAction } from "./fetch-terra-registration-success.action";

/**
 * @param {TerraAuthState} state
 * @param {Action} action
 * @returns {TerraAuthState}
 */
export function reducer(state: TerraAuthState = TerraAuthState.getDefaultState(), action: Action): TerraAuthState {

    switch (action.type) {

        // Update registered
        case FetchTerraRegistrationSuccessAction.ACTION_TYPE:
            return state.onTerraRegistrationStatusSuccess(action as FetchTerraRegistrationSuccessAction);

        // Logout successful, reset Terra auth state
        case LogoutSuccessAction.ACTION_TYPE:
            return TerraAuthState.getDefaultState();

        // Update init to indicate auth has been initialized
        case TerraAuthInitAction.ACTION_TYPE:
            return state.onInit(action as TerraAuthInitAction);

        default:
            return state;
    }
}
