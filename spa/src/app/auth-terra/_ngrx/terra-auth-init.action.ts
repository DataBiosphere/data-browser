/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when Terra authorization has been initialized.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class TerraAuthInitAction implements Action {
    public static ACTION_TYPE = "TERRA_AUTH.INIT";
    public readonly type = TerraAuthInitAction.ACTION_TYPE;
}
