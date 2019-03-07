/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Action dispatched when health check request is successfully returned.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class HealthSuccessAction implements Action {
    public static ACTION_TYPE = "SYSTEM.HEALTH.FETCH_SUCCESS";
    public readonly type = HealthSuccessAction.ACTION_TYPE;
    constructor(public readonly indexing: boolean) {}
}
