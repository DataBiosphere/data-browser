/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of updates to be applied to a data table (eg update to sort order, size, page), specific to version 2.0.
 */

// App dependencies
import { TableParams } from "./table-params.model";

export interface TableParams20 extends TableParams {
    next?: string;
    previous?: string;
}
