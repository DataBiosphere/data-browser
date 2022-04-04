/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of export to Terra response.
 */

// App dependencies
import { ExportToTerraStatus } from "./export-to-terra-status.model";

export interface ExportToTerraResponse {
    url?: string;
    retryAfter?: number;
    status: ExportToTerraStatus;
}
