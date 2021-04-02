/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when a response is received after requesting a project manifest file location. This does not
 * necessarily mean that the project manifest file location request is completed, rather that a successful response
 * was received (such as in progress).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileLocation } from "../../file-location/file-location.model";

export class FetchProjectManifestFileLocationSuccessAction implements Action {
    
    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_MANIFEST_FILE_LOCATION_SUCCESS";
    public readonly type = FetchProjectManifestFileLocationSuccessAction.ACTION_TYPE;

    constructor(public readonly projectId: string, public readonly fileLocation: FileLocation) {}
}
