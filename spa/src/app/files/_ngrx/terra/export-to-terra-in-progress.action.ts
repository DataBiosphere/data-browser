/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when export to Terra success response has been received from server and request is still in progress
 * (ie response status 301).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ExportToTerraResponse } from "../../shared/export-to-terra-response.model";

export class ExportToTerraInProgressAction implements Action {
    public static ACTION_TYPE = "FILE.EXPORT_TO_TERRA_IN_PROGRESS";
    public readonly type = ExportToTerraInProgressAction.ACTION_TYPE;
    constructor(public readonly response: ExportToTerraResponse) {}
}
