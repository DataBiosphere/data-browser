/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project manifest spreadsheet download component.
 */

// App dependencies
import { FileLocation } from "../file-location/file-location.model";
import { ProjectManifestSpreadsheetStatus } from "./project-manifest-spreadsheet-status.model";
import { ProjectManifestSpreadsheet } from "./project-manifest-spreadsheet.model";

export interface ProjectManifestSpreadsheetComponentState {
    fileLocation?: FileLocation;
    projectManifestSpreadsheet?: ProjectManifestSpreadsheet;
    status: ProjectManifestSpreadsheetStatus;
}
