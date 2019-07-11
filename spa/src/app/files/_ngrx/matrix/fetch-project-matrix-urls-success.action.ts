/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when project matrix URLs are to be displayed, and a successful response has been received
 * from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ProjectMatrixUrls } from "../../shared/project-matrix-urls.model";

export class FetchProjectMatrixUrlsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_PROJECT_MATRIX_URLS_SUCCESS";
    public readonly type = FetchProjectMatrixUrlsSuccessAction.ACTION_TYPE;
    constructor(public readonly projectMatrixUrls: ProjectMatrixUrls) {}
}
