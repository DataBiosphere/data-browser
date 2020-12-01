/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when catalog has been selected - only applicable to dev environments.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Catalog } from "../../catalog/catalog.model";

export class SelectCatalogAction implements Action {
    public static ACTION_TYPE = "CATALOG.SELECT_CATALOG";
    public readonly type = SelectCatalogAction.ACTION_TYPE;
    constructor(public readonly catalog: Catalog) {}
}
