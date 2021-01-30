/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project matrix file location download or copy to clipboard is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileLocation } from "../../file-location/file-location.model";

export class FetchProjectMatrixFileLocationSuccessAction implements Action {

    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_MATRIX_FILE_LOCATION_SUCCESS";
    public readonly type = FetchProjectMatrixFileLocationSuccessAction.ACTION_TYPE;

    constructor(public readonly projectId: string,
                public readonly fileUrl: string,
                public readonly fileLocation: FileLocation) {}
}
