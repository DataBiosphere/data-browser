/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when project matrix URLs for multiple projects are to be displayed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectsMatrixUrlsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_PROJECTS_MATRIX_URLS_REQUEST";
    public readonly type = FetchProjectsMatrixUrlsRequestAction.ACTION_TYPE;
    constructor(public readonly entityIds: string[]) {}
}
