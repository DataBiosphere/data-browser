/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when selected set of projects is successfully retrieved from Azul.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SearchTerm } from "../../search/search-term.model";

export class FetchSelectedProjectsSuccessAction implements Action {
    
    public static ACTION_TYPE = "FILE.SEARCH.FETCH_SELECTED_PROJECTS_SUCCESS_ACTION";
    public readonly type = FetchSelectedProjectsSuccessAction.ACTION_TYPE;

    /**
     * @param {SearchTerm[]} searchEntities
     */
    constructor(public readonly searchEntities: SearchTerm[]) {}
}
