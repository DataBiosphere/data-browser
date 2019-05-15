/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when table model has been successfully received from the server, but only data needs updating (and
 * not term counts). For full update to table model, see FetchTableModelSuccessAction.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { PaginationModel } from "../../table/pagination.model";

export class FetchTableDataSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.FETCH_TABLE_DATA_SUCCESS";
    public readonly type = FetchTableDataSuccessAction.ACTION_TYPE;
    constructor(
        public readonly data: any[],
        public readonly pagination: PaginationModel,
        public readonly termCountsByFacetName: Map<string, number>) {}
}
