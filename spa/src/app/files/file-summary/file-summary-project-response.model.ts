/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Model of file summary projects Azul response returned as part of index/summary response.
 */

export interface FileSummaryProjectResponse {
    projects: {
        estimatedCellCount: number;
    },
    cellSuspensions: {
        totalCells: number;
    }
}
