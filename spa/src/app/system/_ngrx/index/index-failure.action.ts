/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when index status check request has failed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class IndexFailureAction implements Action {
    public static ACTION_TYPE = "SYSTEM.INDEX.FETCH_FAILURE";
    public readonly type = IndexFailureAction.ACTION_TYPE;
    constructor() {}
}
