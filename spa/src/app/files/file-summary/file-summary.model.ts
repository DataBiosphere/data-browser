/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * FE model of counts, file sizes and other summary values of the current selection of facets.
 */
import { FileTypeSummary } from "./file-type-summary.model";

export interface FileSummary {
    donorCount: number;
    fileCount: number;
    fileTypeSummaries: FileTypeSummary[];
    organTypes: string[];
    projectCount: number;
    specimenCount: number;
    totalCellCount: number;
    totalFileSize: number;
}
