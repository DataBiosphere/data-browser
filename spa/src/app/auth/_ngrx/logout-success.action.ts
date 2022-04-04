/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user has successfully logged out.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class LogoutSuccessAction implements Action {
    public static ACTION_TYPE = "AUTH.LOGOUT_SUCCESS";
    public readonly type = LogoutSuccessAction.ACTION_TYPE;
}
