/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when system status check is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { Catalog } from "../../files/catalog/catalog.model";

export class SystemStatusRequestAction implements Action {
    public static ACTION_TYPE = "SYSTEM.STATUS.FETCH_REQUEST";
    public readonly type = SystemStatusRequestAction.ACTION_TYPE;

    /**
     * @param {Catalog} catalog - must pass in ref to catalog as catalog system status check occurs during app init (and
     * catalog store is not yet set up).
     */
    constructor(public readonly catalog: Catalog) {}
}
