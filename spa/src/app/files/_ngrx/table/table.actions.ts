import { Action } from "@ngrx/store";
import { TableModel } from "../../table/table.model";
import { TableParamsModel } from "../../table/table-params.model";

export class TableNextPageAction implements Action {
    public static ACTION_TYPE = "TABLE.NEXT_PAGE";
    public readonly type = TableNextPageAction.ACTION_TYPE;

    constructor(public tableParams: TableParamsModel) {}
}

export class TableNextPageSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.NEXT_PAGE_FETCH_DATA_SUCCESS";
    public readonly type = TableNextPageSuccessAction.ACTION_TYPE;

    constructor(public readonly tableModel: TableModel) {}
}


export class TablePreviousPageAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE";
    public readonly type = TablePreviousPageAction.ACTION_TYPE;

    constructor(public tableParams: TableParamsModel) {}
}

export class TablePreviousPageSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE_FETCH_DATA_SUCCESS";
    public readonly type = TablePreviousPageSuccessAction.ACTION_TYPE;

    constructor(public readonly tableModel: TableModel) {}
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

export class FetchPagedOrSortedTableDataRequestAction implements Action {
    public static ACTION_TYPE = "TABLE.PAGED_OR_SORTED_DATA_REQUEST";
    public readonly type = FetchPagedOrSortedTableDataRequestAction.ACTION_TYPE;

    constructor(public tableParams: TableParamsModel) {}
}

export class FetchInitialTableDataRequestAction implements Action {
    public static ACTION_TYPE = "TABLE.DATA_REQUEST";
    public readonly type = FetchInitialTableDataRequestAction.ACTION_TYPE;

    constructor() {}
}

export class FetchTableDataSuccessAction implements Action {
    public static ACTION_TYPE = "TABLE.FETCH_DATA_SUCCESS";
    public readonly type = FetchTableDataSuccessAction.ACTION_TYPE;

    constructor(public readonly tableModel: TableModel) {}
}


export class EntitySelectAction implements Action {
    public static ACTION_TYPE = "ENTITY.SELECT";
    public readonly type = EntitySelectAction.ACTION_TYPE;

    constructor(public key: string) {}
}

export type All
    = TableNextPageAction
    | TablePreviousPageAction
    | TableSetPageAction
    | TableOrderByAction
    | EntitySelectAction;
