/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Auth reducer, handles actions related to handling auth state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { AuthInitAction } from "./auth-init.action";
import { AuthState } from "./auth.state";
import { LoginSuccessAction } from "./login-success.action";
import { LogoutSuccessAction } from "./logout-success.action";
import { SessionContinueAction } from "./session-continue-action";

/**
 * @param {AuthState} state
 * @param {Action} action
 * @returns {AuthState}
 */
export function reducer(
    state: AuthState = AuthState.getDefaultState(),
    action: Action
): AuthState {
    switch (action.type) {
        // Update init to indicate auth has been initialized
        case AuthInitAction.ACTION_TYPE:
            return state.onInit(action as AuthInitAction);

        // Login successful or on session continue, update state with user details
        case LoginSuccessAction.ACTION_TYPE:
        case SessionContinueAction.ACTION_TYPE:
            return state.onAuthenticated(action as LoginSuccessAction);

        // Logout successful, reset auth state
        case LogoutSuccessAction.ACTION_TYPE:
            return AuthState.getDefaultState();

        default:
            return state;
    }
}
