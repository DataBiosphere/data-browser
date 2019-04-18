/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when export to Terra has been requested by user.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ExportToTerraRequestAction implements Action {
    public static ACTION_TYPE = "FILE.EXPORT_TO_TERRA_REQUEST";
    public readonly type = ExportToTerraRequestAction.ACTION_TYPE;
    constructor() {}
}
