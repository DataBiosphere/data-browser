/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of pagination values returned from entity API.
 */

export interface Pagination {

    count: number; // The number of results returned. Will always be the same as the size excpet for the last page.
    current_page: number;
    last_page: number;
    order: string; // The order of the sort 'desc' or 'asc'
    next: string;
    previous: string;
    search_after: string;
    search_after_uid: string;
    search_before: string;
    search_before_uid: string;
    size: number;  // Number of results to return
    sort: string;  // Facet name to sort on.
    total: number; // Total number of rows available
}
