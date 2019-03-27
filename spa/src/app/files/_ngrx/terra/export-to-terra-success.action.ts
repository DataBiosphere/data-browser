/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when export to Terra success response has been received from server.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ExportToTerraResponse } from "../../shared/export-to-terra-response.model";

export class ExportToTerraSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.EXPORT_TO_TERRA_SUCCESS";
    public readonly type = ExportToTerraSuccessAction.ACTION_TYPE;
    constructor(public readonly response: ExportToTerraResponse) {}
}
