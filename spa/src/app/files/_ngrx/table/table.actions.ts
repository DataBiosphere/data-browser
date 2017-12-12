import { Action } from "@ngrx/store";

export class TableNextPageAction implements Action {
    public static ACTION_TYPE = "TABLE.NEXT_PAGE";
    public readonly type = TableNextPageAction.ACTION_TYPE;
    constructor() {}
}

export class TablePreviousPageAAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE";
    public readonly type = TablePreviousPageAAction.ACTION_TYPE;
    constructor() {}
}

export class TableSetPageAAction implements Action {
    public static ACTION_TYPE = "TABLE.SET_PAGE";
    public readonly type = TableSetPageAAction.ACTION_TYPE;
    constructor(public page: number) {}
}

export class TableOrderByAction implements Action {
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE";
    public readonly type = TableOrderByAction.ACTION_TYPE;
    constructor(public field: string, public dir: string) {}
}




export type All
    = TableNextPageAction
    | TablePreviousPageAAction
    | TableOrderByAction;
