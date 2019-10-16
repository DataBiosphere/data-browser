/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when index status check is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class IndexRequestAction implements Action {
    public static ACTION_TYPE = "SYSTEM.INDEX.FETCH_REQUEST";
    public readonly type = IndexRequestAction.ACTION_TYPE;
    constructor() {}
}
