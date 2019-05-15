/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the next page of results has been successfully retrieved from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TableModel } from "../../table/table.model";

export class TableNextPageSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.NEXT_PAGE_FETCH_DATA_SUCCESS";
    public readonly type = TableNextPageSuccessAction.ACTION_TYPE;
    constructor(public readonly tableModel: TableModel) {}
}
