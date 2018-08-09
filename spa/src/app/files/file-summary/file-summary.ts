/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of counts, file sizes and other summary values of the current selection of facets.
 */
import { FileTypeSummary } from "./file-type-summary";

export interface FileSummary {
    donorCount: number;
    fileCount: number;
    fileTypeSummaries: FileTypeSummary[];
    organCount: number;
    projectCount: number;
    specimenCount: number;
    totalCellCount: number;
    totalFileSize: number;
}
