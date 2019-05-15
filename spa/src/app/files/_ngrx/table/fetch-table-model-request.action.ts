/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the set of data that populates table rows and corresponding pagination details, are requested
 * from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchTableModelRequestAction implements Action {
    public static ACTION_TYPE = "TABLE.FETCH_TABLE_MODEL_REQUEST";
    public readonly type = FetchTableModelRequestAction.ACTION_TYPE;
    constructor() {}
}
