/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing core HCA toolbar component.
 */

// Core dependencies
import GoogleUser = gapi.auth2.GoogleUser;

export interface HCAToolbarComponentState {
    authenticated: boolean;
    catalogUpdatedSinceLastVisit: boolean;
    menuOpen: boolean;
    modalOpen: boolean;
    user?: GoogleUser;
}
