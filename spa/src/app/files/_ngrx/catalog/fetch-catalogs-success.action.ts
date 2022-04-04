/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when set of catalogs have been successfully retrieved from Azul.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Atlas } from "../../atlas/atlas.model";

export class FetchCatalogsSuccessAction implements Action {
    public static ACTION_TYPE = "CATALOG.FETCH_CATALOGS_SUCCESS";
    public readonly type = FetchCatalogsSuccessAction.ACTION_TYPE;

    /**
     * @param {Atlas} atlas
     */
    constructor(public readonly atlas: Atlas) {}
}
