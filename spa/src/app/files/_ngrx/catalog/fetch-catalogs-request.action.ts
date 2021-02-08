/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered on app init to retrieve the set of catalogs from Azul.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchCatalogsRequestAction implements Action {
    
    public static ACTION_TYPE = "CATALOG.FETCH_CATALOGS_REQUEST";
    public readonly type = FetchCatalogsRequestAction.ACTION_TYPE;
}
