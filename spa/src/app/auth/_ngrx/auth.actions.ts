import { User } from "../../data/user/user.model";
import { Action } from "@ngrx/store";

export class AuthenticationRequestedAction implements Action {
    public static ACTION_TYPE = "AUTH.AUTHENTICATION_REQUESTED";
    public readonly type = AuthenticationRequestedAction.ACTION_TYPE;
    constructor() {}
}

export class AuthenticationSuccessAction implements Action {
    public static ACTION_TYPE = "AUTH.AUTHENTICATION_SUCCESS";
    public readonly type = AuthenticationSuccessAction.ACTION_TYPE;
    constructor(public readonly user: User) {}
}

export class SyncSessionRequestAction implements Action {
    public static ACTION_TYPE = "AUTH.SYNC_SESSION_REQUEST";
    public readonly type = SyncSessionRequestAction.ACTION_TYPE;
    constructor() {}
}

export class SyncSessionSuccessAction implements Action {
    public static ACTION_TYPE = "AUTH.SYNC_SESSION_SUCCESS";
    public readonly type = SyncSessionSuccessAction.ACTION_TYPE;
    constructor(public readonly user: User) {}
}

export class LogoutAction implements Action {
    public static ACTION_TYPE = "AUTH.LOGOUT";
    public readonly type = LogoutAction.ACTION_TYPE;
    constructor() {}
}

export class DownloadRedwoodTokenAction implements Action {
    public static ACTION_TYPE = "AUTH.DOWNLOAD_REDWOOD_TOKEN";
    public readonly type = DownloadRedwoodTokenAction.ACTION_TYPE;
    constructor() {}
}

export type All
    = AuthenticationSuccessAction
    | AuthenticationRequestedAction
    // | AuthenticationFailedAction
    | SyncSessionRequestAction
    | SyncSessionSuccessAction
    | LogoutAction
    | DownloadRedwoodTokenAction;
    // | LoginRedirectAction
    // | AuthorizedRedirectAction;