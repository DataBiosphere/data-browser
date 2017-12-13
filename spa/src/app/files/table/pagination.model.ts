export interface PaginationModel {

    count: number; // The number of results returned. Will always be the same as the size excpet for the last page.
    from: number;  // The offset to return rows from starting from 1
    order: string; // The order of the sort 'desc' or 'asc'
    page: number;  // The current page given the total and the size.
    size: number;  // Number of results to return
    sort: string;  // Facet name to sort on.
    total: number; // Total number of rows available
}