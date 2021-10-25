/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of counts, file sizes and other summary values of the current selection of facets returned from the Azul
 * /summary API endpoint.
 */

// App dependencies
import { FileTypeSummaryResponse } from "./file-type-summary-response.model";

export interface FileSummaryResponse {
    donorCount: number;
    fileCount: number;
    fileTypeSummaries: FileTypeSummaryResponse[];
    organTypes: string[];
    projectCount: number;
    specimenCount: number;
    totalCellCount: number;
    totalFileSize: number;
}
