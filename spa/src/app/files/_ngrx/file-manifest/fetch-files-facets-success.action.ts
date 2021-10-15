/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when facet set is successfully fetched from files endpoint. Used to populate facet
 * data in the data summary section on the get data and project download pages.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Facet } from "../../facet/facet.model";

export class FetchFilesFacetsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.FETCH_FILES_SUCCESS";
    public readonly type = FetchFilesFacetsSuccessAction.ACTION_TYPE;
    constructor(public readonly filesFacets: Facet[]) {}
}
