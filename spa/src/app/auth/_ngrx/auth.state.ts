/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing auth functionality.
 */

// App dependencies
import GoogleUser = gapi.auth2.GoogleUser;

// App dependencies
import { AuthInitAction } from "./auth-init.action";
import { LoginSuccessAction } from "./login-success.action";

export class AuthState {

    /**
     * @param {boolean} init
     * @param {boolean} authenticated
     * @param {GoogleUser} user
     */
    constructor(public readonly init: boolean, 
                public readonly authenticated: boolean, 
                public readonly user: GoogleUser) {}

    /**
     * Update state to indicate auth initialization has been completed.
     *
     * @param {AuthInitAction} authInitAction
     */
    public onInit(authInitAction: AuthInitAction) {

        return new AuthState(true, this.authenticated, this.user);
    }

    /**
     * Update state with user details.
     * 
     * @param {LoginSuccessAction} loginSuccessAction
     */
    public onLoggedIn(loginSuccessAction: LoginSuccessAction) {

        return new AuthState(this.init, true, loginSuccessAction.user)
    }
    
    /**
     * Create default support request state.
     *
     * @returns {SupportRequestState}
     */
    public static getDefaultState(): AuthState {

        return new AuthState(false, false, null);
    }
}
