/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when a response is received after requesting a project TSV URL. This does not necessarily mean
 * that the project TSV URL request is completed, rather that a successful response was received (eg in progress).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";

export class FetchProjectTSVUrlSuccessAction implements Action {
    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_TSV_URL_SUCCESS";
    public readonly type = FetchProjectTSVUrlSuccessAction.ACTION_TYPE;
    constructor(public readonly response: ProjectTSVUrlResponse) {}
}
