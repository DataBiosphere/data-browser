/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the next page of results in the table are to be requested and displayed.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TableParamsModel } from "../../table/table-params.model";

export class TableNextPageAction implements Action {
    public static ACTION_TYPE = "TABLE.NEXT_PAGE";
    public readonly type = TableNextPageAction.ACTION_TYPE;
    constructor(public tableParams: TableParamsModel) {}
}
