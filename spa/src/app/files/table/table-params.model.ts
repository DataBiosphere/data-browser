/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Defaults for table that displays file facet data.
 */

export interface TableParamsModel {
    size: number;  // Number of results to return
    sort?: string;  // Facet to sort on.
    order?: string; // Sort order asc or desc
    search_after?: string;
    search_after_uid?: string;
    search_before?: string;
    search_before_uid?: string;
}

export const DEFAULT_TABLE_PARAMS: TableParamsModel = {
    size: 15
};
