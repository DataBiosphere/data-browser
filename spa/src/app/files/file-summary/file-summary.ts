/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of counts, file sizes and other summary values of the current selection of fileFacets.
 */
import { FileTypeSummary } from "./file-type-summary";

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
