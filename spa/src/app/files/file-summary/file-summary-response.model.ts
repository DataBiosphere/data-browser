/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of counts, file sizes and other summary values of the current selection of facets returned from the Azul
 * /summary API endpoint.
 */

// App dependencies
import { FileSummaryProjectResponse } from "./file-summary-project-response.model";
import { FileTypeSummaryResponse } from "./file-type-summary-response.model";

export interface FileSummaryResponse {
    donorCount: number;
    fileCount: number;
    fileTypeSummaries: FileTypeSummaryResponse[];
    organTypes: string[];
    projects: FileSummaryProjectResponse[];
    projectCount: number;
    specimenCount: number;
    totalCellCount: number; // Deprecated as per DB 2118
    totalFileSize: number;
}
