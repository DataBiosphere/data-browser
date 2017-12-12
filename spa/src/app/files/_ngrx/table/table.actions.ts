import { Action } from "@ngrx/store";
import { TableModel } from "../../table/table.model";

export class TableNextPageAction implements Action {
    public static ACTION_TYPE = "TABLE.NEXT_PAGE";
    public readonly type = TableNextPageAction.ACTION_TYPE;
    constructor() {}
}

export class TablePreviousPageAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE";
    public readonly type = TablePreviousPageAction.ACTION_TYPE;
    constructor() {}
}

export class TableSetPageAction implements Action {
    public static ACTION_TYPE = "TABLE.SET_PAGE";
    public readonly type = TableSetPageAction.ACTION_TYPE;
    constructor(public page: number) {}
}

export class TableOrderByAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE";
    public readonly type = TableOrderByAction.ACTION_TYPE;
    constructor(public field: string, public dir: string) {}
}
export class FetchTableDataRequestAction implements Action {
    public static ACTION_TYPE = "TABLE.DATA_REQUEST";
    public readonly type = FetchTableDataRequestAction.ACTION_TYPE;
    constructor() {}
}
export class FetchTableDataSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.FETCH_DATA_SUCCESS";
    public readonly type = FetchTableDataSuccessAction.ACTION_TYPE;
    constructor(public readonly tableModel: TableModel) {}
}




export type All
    = TableNextPageAction
    | TablePreviousPageAction
    | TableSetPageAction
    | TableOrderByAction;
