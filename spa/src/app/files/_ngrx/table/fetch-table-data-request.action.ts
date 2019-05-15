/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the set of data that populates table rows is requested from the server. This is a different
 * action to the FetchTableModelRequest action with handles the complete table model (data, pagination and term counts).
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchTableDataRequestAction implements Action {
    public static ACTION_TYPE = "TABLE.FETCH_TABLE_DATA_REQUEST";
    public readonly type = FetchTableDataRequestAction.ACTION_TYPE;
    constructor(public readonly termCountsByFacetName: Map<string, number>) {} // Term counts to use when updating the table model state
}
