/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when system status check is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class SystemStatusRequestAction implements Action {
    public static ACTION_TYPE = "SYSTEM.STATUS.FETCH_REQUEST";
    public readonly type = SystemStatusRequestAction.ACTION_TYPE;
    constructor() {}
}
