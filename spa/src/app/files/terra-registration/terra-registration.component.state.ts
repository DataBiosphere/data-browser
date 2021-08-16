/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing Terra registration component.
 */

// Core dependencies
import GoogleUser = gapi.auth2.GoogleUser;

export interface TerraRegistrationComponentState {
    loaded: boolean;
    user?: GoogleUser;
}
