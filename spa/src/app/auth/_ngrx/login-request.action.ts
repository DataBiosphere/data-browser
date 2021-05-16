/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user clicks login button.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class LoginRequestAction implements Action {
    public static ACTION_TYPE = "AUTH.LOGIN_REQUEST";
    public readonly type = LoginRequestAction.ACTION_TYPE;
}
