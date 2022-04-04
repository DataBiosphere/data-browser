/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered on load of app, to read local JSON project edits data into store.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectEditsRequestAction implements Action {
    public static ACTION_TYPE = "PROJECT.FETCH_EDITS_REQUEST";
    public readonly type = FetchProjectEditsRequestAction.ACTION_TYPE;
    constructor() {}
}
