/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when facets have re-built after a response from the backend has been received. Facets include both
 * facets returns and parsed from the server, as well as any facets built client side (such as age range).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Facet } from "../../facet/facet.model";

export class FetchFacetsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.FETCH_SUCCESS";
    public readonly type = FetchFacetsSuccessAction.ACTION_TYPE;
    constructor(public readonly facets: Facet[]) {}
}
