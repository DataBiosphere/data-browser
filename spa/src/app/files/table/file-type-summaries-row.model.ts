/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of the file type summaries data displayed in an entity table. Applicable only to projects and samples.
 */

export interface FileTypeSummariesRow {
    bamCount: number;
    matrixCount: number;
    otherCount: number;
    rawCount: string;
    totalCount: number;
}
