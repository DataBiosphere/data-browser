/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when error status code and error message are to be cleared from the store.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearErrorStateAction implements Action {
    public static ACTION_TYPE = "HTTP.CLEAR_ERROR_STATE";
    public readonly type = ClearErrorStateAction.ACTION_TYPE;
    constructor() {}
}
