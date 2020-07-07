/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered during get data flow, to fetch facet set from the files endpoint. Used to populate facet
 * data in the data summary section on the get data pages.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchFilesFacetsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.FETCH_FILES_REQUEST";
    public readonly type = FetchFilesFacetsRequestAction.ACTION_TYPE;
    constructor() {}
}
