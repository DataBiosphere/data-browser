/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when a new session is started by a previously authenticated user.
 */

// App dependencies
import GoogleUser = gapi.auth2.GoogleUser;

// Core dependencies
import { Action } from "@ngrx/store";

export class SessionContinueAction implements Action {
    public static ACTION_TYPE = "AUTH.SESSION_CONTINUE";
    public readonly type = SessionContinueAction.ACTION_TYPE;

    /**
     * @param {GoogleUser} user
     */
    constructor(public readonly user: GoogleUser) {}
}
