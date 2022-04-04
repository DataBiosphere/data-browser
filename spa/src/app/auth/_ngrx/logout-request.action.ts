/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user clicks logout button.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class LogoutRequestAction implements Action {
    public static ACTION_TYPE = "AUTH.LOGOUT_REQUEST";
    public readonly type = LogoutRequestAction.ACTION_TYPE;
}
