/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when a response is received after requesting a file manifest URL.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ManifestResponse } from "../../shared/manifest-response.model";

export class FetchFileManifestUrlUpdateAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.FETCH_FILE_MANIFEST_URL_UPDATE";
    public readonly type = FetchFileManifestUrlUpdateAction.ACTION_TYPE;
    constructor(public readonly response: ManifestResponse) {}
}
