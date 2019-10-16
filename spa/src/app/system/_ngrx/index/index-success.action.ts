/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when index status check request is successfully returned.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class IndexSuccessAction implements Action {
    public static ACTION_TYPE = "SYSTEM.INDEX.FETCH_SUCCESS";
    public readonly type = IndexSuccessAction.ACTION_TYPE;
    constructor(public readonly ok: boolean, public readonly indexing: boolean) {}
}
