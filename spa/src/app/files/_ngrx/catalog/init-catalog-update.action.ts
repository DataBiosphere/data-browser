/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered on load of app to set catalog updates in store.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { CatalogUpdate } from "../../catalog/catalog-update.model";

export class InitCatalogUpdateAction implements Action {
    
    public static ACTION_TYPE = "CATALOG.INIT_CATALOG_UPDATE";
    public readonly type = InitCatalogUpdateAction.ACTION_TYPE;

    /**
     * @param {CatalogUpdate} catalogUpdate
     */
    constructor(public readonly catalogUpdate: CatalogUpdate) {}
}
