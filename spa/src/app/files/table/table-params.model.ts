/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Defaults for table that displays file facet data.
 */

export interface TableParamsModel {
    from: number;  // Offset of results to return starting from 1
    size: number;  // Number of results to return
    sort?: string;  // Facet to sort on.
    order?: string; // Sort order asc or desc
}

export const DEFAULT_TABLE_PARAMS: TableParamsModel = {
    from: 1,
    size: 10
};
