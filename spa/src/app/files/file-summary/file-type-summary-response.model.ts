/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file type summary Azul response returned as part of /summary response or, /projects or /samples responses.
 */

export interface FileTypeSummaryResponse {
    contentDescription: string[];
    count: number;
    format: string;
    isIntermediate: boolean;
    matrixCellCount: number;
    totalSize: number;
}
