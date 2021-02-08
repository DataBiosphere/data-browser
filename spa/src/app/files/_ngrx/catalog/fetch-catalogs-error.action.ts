/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when error occurred during request for set of catalogs from Azul.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchCatalogsErrorAction implements Action {
    
    public static ACTION_TYPE = "CATALOG.FETCH_CATALOGS_ERROR";
    public readonly type = FetchCatalogsErrorAction.ACTION_TYPE;
}
