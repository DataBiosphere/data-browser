/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling export to Terra-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TerraState } from "./terra.state";
import { ExportToTerraActionRequest } from "./export-to-terra-action.request";
import { ExportToTerraSuccessAction } from "./export-to-terra-success.action";
import { ResetExportToTerraStatusAction } from "./reset-export-to-terra-status.action";

export function reducer(state: TerraState = TerraState.getDefaultState(), action: Action): TerraState {

    switch (action.type) {

        // Reset export to Terra back to its default status
        case ResetExportToTerraStatusAction.ACTION_TYPE:
            return TerraState.getDefaultState();

        // Request for export to Terra has been initiated.
        case ExportToTerraActionRequest.ACTION_TYPE:
            return state.exportToTerraRequest();

        // Export to Terra response has been received from the server.
        case ExportToTerraSuccessAction.ACTION_TYPE:
            return state.exportToTerraSuccess(action as ExportToTerraSuccessAction);

        default:
            return state;
    }
}
