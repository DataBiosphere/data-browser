/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file "leaf" values in matrix tree response from Azul.
 */

export interface MatrixResponseFile {
    contentDescription: string[];
    matrixCellCount?: number;
    name: string;
    size: number;
    url: string;
    uuid: string;
    version: string;
}
