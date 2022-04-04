import { Action } from "@ngrx/store";
import { Project } from "../../shared/project.model";

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

/**
 * Action dispatched when a project has been selected from the projects table and the corresponding project details are
 * to be requested from the server. Note the side effect for this action, ProjectEffects.fetchProject$ uses a distinct
 * operator to ensure duplicate hits to fetch a project are not sent. To reset the distinct operator,
 * ClearSelectedProjectAction must be called (for example, in ngOnDestroy.
 */
export class FetchProjectRequestAction implements Action {
    public static ACTION_TYPE = "DEFAULT_PROJECT.FETCH_REQUEST";
    public readonly type = FetchProjectRequestAction.ACTION_TYPE;
    constructor(public projectId: string) {}
}

/**
 * Action dispatched when requesting the details of a project from the projects table has successfully completed.
 */
export class FetchProjectSuccessAction implements Action {
    public static ACTION_TYPE = "DEFAULT_PROJECT.FETCH_SUCCESS";
    public readonly type = FetchProjectSuccessAction.ACTION_TYPE;
    constructor(public project: Project) {}
}

/**
 * Action dispatched when an error has occurred when requesting the details of a project that was selected from the
 * projects table.
 */
export class FetchProjectFailureAction implements Action {
    public static ACTION_TYPE = "DEFAULT_PROJECT.FETCH_FAILURE";
    public readonly type = FetchProjectFailureAction.ACTION_TYPE;
    constructor(public error: any) {}
}

export type All =
    | TableSetPageAction
    | TableOrderByAction
    | FetchProjectRequestAction
    | FetchProjectSuccessAction
    | FetchProjectFailureAction;
