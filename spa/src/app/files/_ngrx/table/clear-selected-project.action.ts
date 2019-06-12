/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when leaving the project detail page; the project is no longer selected for display.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearSelectedProjectAction implements Action {
    public static ACTION_TYPE = "DEFAULT_PROJECT.CLEAR_SELECTED_PROJECT";
    public readonly type = ClearSelectedProjectAction.ACTION_TYPE;
    constructor() {}
}
