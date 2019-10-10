/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when health check request has failed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class HealthFailureAction implements Action {
    public static ACTION_TYPE = "SYSTEM.HEALTH.FETCH_FAILURE";
    public readonly type = HealthFailureAction.ACTION_TYPE;
    constructor() {}
}
