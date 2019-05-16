/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of table state saved in store, that displays file facet data, specific to an entity (eg projects, samples,
 * files) and related counts.
 */

// App dependencies
import { PaginationModel } from "./pagination.model";

export interface TableModel {

    pagination: PaginationModel;
    data: any[];
    loading?: boolean;
    tableName: string;
    termCountsByFacetName: Map<string, number>;
}
