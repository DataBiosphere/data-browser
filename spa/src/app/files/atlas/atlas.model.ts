/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of atlas.
 */

// App dependencies
import { Catalog } from "../catalog/catalog.model";

export interface Atlas {
    defaultCatalog: Catalog;
    catalogs: Catalog[];
}
