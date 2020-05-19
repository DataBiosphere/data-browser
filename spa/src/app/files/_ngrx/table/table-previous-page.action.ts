/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the previous page of results in the table are to be requested and displayed.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TableParams } from "../../table/pagination/table-params.model";

export class TablePreviousPageAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE";
    public readonly type = TablePreviousPageAction.ACTION_TYPE;
    constructor(public tableParams: TableParams) {}
}

