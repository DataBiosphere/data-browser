/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Action dispatched when file fileFacets are to be updated. This can be on load of app, select or clear of fileFacets, or
 * select of project.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchFileFacetsRequestAction implements Action {

    public static ACTION_TYPE = "FILE.FACET.FETCH_REQUEST";
    public readonly type = FetchFileFacetsRequestAction.ACTION_TYPE;

    /**
     * @param {boolean} updateTableData - True if table data is to be updated. This is false on select of project as we
     * want table data and state (eg pagination) to remain unchanged on select of project.
     */
    constructor(public readonly updateTableData: boolean) {}
}
