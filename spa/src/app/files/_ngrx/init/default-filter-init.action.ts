/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when default app filter has been initialized - either in the ProjectsCanActivate guard if default
 * filter is initialized there, or in InitEffects on navigation end of the first navigation event.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class DefaultFilterInitAction implements Action {
    public static ACTION_TYPE = "INIT.DEFAULT_FILTER_INIT";
    public readonly type = DefaultFilterInitAction.ACTION_TYPE;
    constructor() {}
}

