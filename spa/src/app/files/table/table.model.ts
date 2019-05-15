/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of table that displays file facet data, specific to an entity (eg projects, samples, files).
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
