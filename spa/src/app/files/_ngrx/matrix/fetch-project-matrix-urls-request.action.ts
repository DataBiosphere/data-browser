/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when project matrix URLs are to be displayed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectMatrixUrlsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_PROJECT_MATRIX_URLS_REQUEST";
    public readonly type = FetchProjectMatrixUrlsRequestAction.ACTION_TYPE;
    constructor(public readonly entityId: string) {}
}
