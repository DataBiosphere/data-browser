/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user has requested file manifest URL.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class RequestFileManifestUrlAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.REQUEST_FILE_MANIFEST_URL";
    public readonly type = RequestFileManifestUrlAction.ACTION_TYPE;
    constructor() {}
}
