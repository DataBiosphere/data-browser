/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when export to Terra request status is to be reset back to its default value.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ResetExportToTerraStatusAction implements Action {
    public static ACTION_TYPE = "FILE.RESET_EXPORT_TO_TERRA_STATUS";
    public readonly type = ResetExportToTerraStatusAction.ACTION_TYPE;
    constructor() {}
}
