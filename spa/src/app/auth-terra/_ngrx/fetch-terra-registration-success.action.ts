
/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user's registration status has successfully been retrieved from Terra.
 */

// App dependencies
import GoogleUser = gapi.auth2.GoogleUser;

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchTerraRegistrationSuccessAction implements Action {

    public static ACTION_TYPE = "TERRA_AUTH.FETCH_TERRA_REGISTRATION_SUCCESS";
    public readonly type = FetchTerraRegistrationSuccessAction.ACTION_TYPE;

    /**
     * @param {boolean} registered
     */
    constructor(public readonly registered: boolean) {}
}
