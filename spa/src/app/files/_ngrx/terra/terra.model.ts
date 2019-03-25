/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of Terra-related state.
 */

// App dependencies
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";

export interface Terra {
    exportToTerraStatus: ExportToTerraStatus;
    exportToTerraUrl?: string;
}
