/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when request is sent to fetch the integrations for a specific project.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchIntegrationsByProjectIdRequestAction implements Action {
    public static ACTION_TYPE = "FILE.INTEGRATIONS_BY_PROJECT_ID_FETCH_REQUEST";
    public readonly type =
        FetchIntegrationsByProjectIdRequestAction.ACTION_TYPE;
    constructor(public readonly projectId) {}
}
