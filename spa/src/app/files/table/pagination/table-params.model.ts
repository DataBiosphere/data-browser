/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Base interface, models updates to be applied to a data table (eg update to sort order, size, page). 
 */

export interface TableParams {
    size: number;  // Number of results to return
    sort?: string;  // Facet to sort on.
    order?: string; // Sort order asc or desc
    search_after?: string;
    search_after_uid?: string;
    search_before?: string;
    search_before_uid?: string;
}

export const DEFAULT_TABLE_PARAMS: TableParams = {
    size: 15
};
