/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Fe model of file type summary returned as part of /summary response or, /projects or /samples responses.
 */

export interface FileTypeSummary {
    contentDescription: string[];
    count: number;
    fileType: string;
    isIntermediate: boolean;
    matrixCellCount: number;
    totalSize: number;
}
