/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model indicating if project manifest spreadsheet exists, and if so, its corresponding values for requesting
 * the spreadsheet.
 */

// App dependencies
import { ProjectManifestSpreadsheetStatus } from "./project-manifest-spreadsheet-status.model";

export interface ProjectManifestSpreadsheet {
    exists?: boolean;
    fileFormat?: string;
    fileName?: string;
    fileUrl?: string;
    projectId?: string;
    status: ProjectManifestSpreadsheetStatus;
}
