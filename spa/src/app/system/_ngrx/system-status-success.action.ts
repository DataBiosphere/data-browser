/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when system status check request is successfully returned.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class SystemStatusSuccessAction implements Action {
    public static ACTION_TYPE = "SYSTEM.STATUS.FETCH_SUCCESS";
    public readonly type = SystemStatusSuccessAction.ACTION_TYPE;
    constructor(
        public readonly ok: boolean,
        public readonly indexing: boolean
    ) {}
}
