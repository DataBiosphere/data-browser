/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the previous page of results has been successfully retrieved from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TableModel } from "../../table/table.model";

export class TablePreviousPageSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE_FETCH_DATA_SUCCESS";
    public readonly type = TablePreviousPageSuccessAction.ACTION_TYPE;
    constructor(public readonly tableModel: TableModel) {}
}
