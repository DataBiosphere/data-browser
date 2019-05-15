/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when table model (table data and corresponding pagination details) has been successfully received
 * from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TableModel } from "../../table/table.model";

export class FetchTableModelSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.FETCH_TABLE_MODEL_SUCCESS";
    public readonly type = FetchTableModelSuccessAction.ACTION_TYPE;
    constructor(public readonly tableModel: TableModel) {}
}
