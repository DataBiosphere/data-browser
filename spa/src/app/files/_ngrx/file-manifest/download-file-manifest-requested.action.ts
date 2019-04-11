/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched on request of manifest download.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { ManifestResponse } from "../../shared/manifest-response.model";

export class DownloadFileManifestRequestedAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.DOWNLOAD_REQUESTED";
    public readonly type = DownloadFileManifestRequestedAction.ACTION_TYPE;
    constructor(public readonly response: ManifestResponse) {
    }
}
