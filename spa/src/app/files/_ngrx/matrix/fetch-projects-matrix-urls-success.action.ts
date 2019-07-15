/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when project matrix URLs for multiple projects are to be displayed, and a successful
 * response has been received from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ProjectMatrixUrls } from "../../shared/project-matrix-urls.model";

export class FetchProjectsMatrixUrlsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_PROJECTS_MATRIX_URLS_SUCCESS";
    public readonly type = FetchProjectsMatrixUrlsSuccessAction.ACTION_TYPE;
    constructor(public readonly projectMatrixUrls: ProjectMatrixUrls) {}
}
