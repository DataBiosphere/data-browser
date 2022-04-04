/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of catalog updates; array of new and updated project IDs.
 */

// App dependencies
import { Catalog } from "./catalog.model";

export interface CatalogUpdate {
    catalog: Catalog;
    new: string[];
    runDate: Date;
    updated: string[];
}
