/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when health check is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class HealthRequestAction implements Action {
    public static ACTION_TYPE = "SYSTEM.HEALTH.FETCH_REQUEST";
    public readonly type = HealthRequestAction.ACTION_TYPE;
    constructor() {}
}
