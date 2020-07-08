/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when facet set is successfully fetched from files endpoint. Used to populate facet
 * data in the data summary section on the get data pages.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Facet } from "../../facet/facet.model";

export class FetchFilesFacetsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.FETCH_FILE_FACETS_SUCCESS";
    public readonly type = FetchFilesFacetsSuccessAction.ACTION_TYPE;
    constructor(public readonly fileFileFacets: Facet[]) {}
}
