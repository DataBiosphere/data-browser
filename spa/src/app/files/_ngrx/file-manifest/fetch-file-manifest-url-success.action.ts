/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when a response is received after requesting a file manifest URL. This does not necessarily mean
 * that the file manifest URL request is completed, rather that a successful response was received (eg in progress).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ManifestResponse } from "../../shared/manifest-response.model";

export class FetchFileManifestUrlSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.FETCH_FILE_MANIFEST_URL_SUCCESS";
    public readonly type = FetchFileManifestUrlSuccessAction.ACTION_TYPE;
    constructor(public readonly response: ManifestResponse) {}
}
