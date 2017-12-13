export interface TableParamsModel {

    from: number;  // Offset of results to return starting from 1
    size: number;  // Number of resluts to return
    sort?: string;  // Facet to sort on.
    order?: string; // Sort order asc or desc
}

export const DEFAULT_TABLE_PARAMS: TableParamsModel = {
    from: 1,
    size: 5
};