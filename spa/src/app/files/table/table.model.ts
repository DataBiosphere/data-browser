/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of table state saved in store, that displays file facet data, specific to an entity (eg projects, samples,
 * files) and related counts.
 */

// App dependencies
import { Pagination } from "./pagination/pagination.model";

export interface TableModel {

    pagination: Pagination;
    data: any[];
    loading?: boolean;
    tableName: string;
    termCountsByFacetName: Map<string, number>;
}
