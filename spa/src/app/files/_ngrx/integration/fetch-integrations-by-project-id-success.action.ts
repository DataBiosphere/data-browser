/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when request to fetch the integrations for a specific project has successfully completed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Portal } from "./portal.model";

export class FetchIntegrationsByProjectIdSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.INTEGRATIONS_BY_PROJECT_ID_FETCH_SUCCESS";
    public readonly type = FetchIntegrationsByProjectIdSuccessAction.ACTION_TYPE;
    constructor(public readonly projectId: string, public readonly integrations: Portal[]) {}
}

