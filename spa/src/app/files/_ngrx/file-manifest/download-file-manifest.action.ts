/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user has requested download of file manifest.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class DownloadFileManifestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.DOWNLOAD";
    public readonly type = DownloadFileManifestAction.ACTION_TYPE;
    constructor() {}
}
