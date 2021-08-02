/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Model of file type summary. Returned as part of /summary response or, /projects or /samples responses.
 */

export interface FileTypeSummary {
    contentDescription: string[];
    count: number;
    fileType: string;
    isIntermediate: boolean;
    matrixCellCount: number;
    totalSize: number;
}
