/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when authorization has been initialized.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class AuthInitAction implements Action {
    public static ACTION_TYPE = "AUTH.INIT";
    public readonly type = AuthInitAction.ACTION_TYPE;
}
