/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when project edits data has been successfully read from local JSON.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Project } from "../../shared/project.model";

export class FetchProjectEditsSuccessAction implements Action {
    public static ACTION_TYPE = "PROJECT.FETCH_EDITS_SUCCESS";
    public readonly type = FetchProjectEditsSuccessAction.ACTION_TYPE;
    constructor(public readonly projects: Project[]) {}
}

