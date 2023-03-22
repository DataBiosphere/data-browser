/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when response from checking if a file exists, has been received.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ProjectManifestSpreadsheet } from "../../project-manifest-spreadsheet/project-manifest-spreadsheet.model";

export class FetchProjectFullManifestExistsSuccessAction implements Action {
    public static ACTION_TYPE =
        "PROJECT.FETCH_PROJECT_FULL_MANIFEST_EXISTS_SUCCESS";
    public readonly type =
        FetchProjectFullManifestExistsSuccessAction.ACTION_TYPE;

    constructor(
        public readonly projectManifestSpreadsheet: ProjectManifestSpreadsheet
    ) {}
}
