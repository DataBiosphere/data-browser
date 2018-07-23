export interface PaginationModel {

    count: number; // The number of results returned. Will always be the same as the size excpet for the last page.
    order: string; // The order of the sort 'desc' or 'asc'
    size: number;  // Number of results to return
    sort: string;  // Facet name to sort on.
    total: number; // Total number of rows available
    search_after: string;
    search_after_uid: string;
    search_before: string;
    search_before_uid: string;
}