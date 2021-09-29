/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project bulk download component.
 */

// App dependencies
import { Facet } from "../../facet/facet.model";
import { FileTypeSummary } from "../../file-summary/file-type-summary";
import { FileSummary } from "../../file-summary/file-summary";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { Project } from "../../shared/project.model";

export interface ProjectTerraExportState {

    exportToTerraStatus?: ExportToTerraStatus;
    exportToTerraUrl?: string;
    loaded: boolean;
    filesFacets?: Facet[]
    fileSummary?: FileSummary;
    fileTypeSummaries?: FileTypeSummary[];
    project?: Project;
    projectSpeciesFacet?: Facet;
    selectedSearchTermNames?: string[];
}
