/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of Terra-related state.
 */

// App dependencies
import { ExportToTerraSuccessAction } from "./export-to-terra-success.action";
import { Terra } from "./terra.model";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";

const DEFAULT_TERRA_STATE = {
    exportToTerraStatus: ExportToTerraStatus.NOT_STARTED
};

export class TerraState implements Terra {

    public readonly exportToTerraStatus: ExportToTerraStatus;
    public readonly exportToTerraUrl: string;

    /**
     * @param {TerraState} state
     */
    constructor(state: Terra = DEFAULT_TERRA_STATE) {
        Object.assign(this, state);
    }

    /**
     * An export to Terra request has been initated. Update export status accordingly.
     *
     * @returns {TerraState}
     */
    public exportToTerraRequest(): TerraState {

        return new TerraState({
            exportToTerraStatus: ExportToTerraStatus.INITIATED
        });
    }

    /**
     * Export to Terra request has received a successful response from the server. This does not necessarily mean the
     * response has completed; the status of the response could be "in progress" with the corresponding retry URL (and
     * not the final export URL).
     *
     * @param {FetchFileSummarySuccessAction} action
     * @returns {TerraState}
     */
    public  exportToTerraSuccess(action: ExportToTerraSuccessAction) {
        return new TerraState({
            exportToTerraStatus: action.response.status,
            exportToTerraUrl: action.response.url
        });
    }

    /**
     * Return default Terra state - export request has not been initiated.
     *
     * @returns {TerraState}
     */
    public static getDefaultState() {
        return new TerraState({
            exportToTerraStatus: ExportToTerraStatus.NOT_STARTED
        });
    }
}
