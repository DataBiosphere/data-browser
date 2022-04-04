/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when login has successfully completed with Google.
 */

// App dependencies
import GoogleUser = gapi.auth2.GoogleUser;

// Core dependencies
import { Action } from "@ngrx/store";

export class LoginSuccessAction implements Action {
    public static ACTION_TYPE = "AUTH.LOGIN_SUCCESS";
    public readonly type = LoginSuccessAction.ACTION_TYPE;

    /**
     * @param {GoogleUser} user
     */
    constructor(public readonly user: GoogleUser) {}
}
