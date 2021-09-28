/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when file manifest URL request is cancelled (for example, due to navigation away from download).
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearFileManifestUrlAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.CLEAR_FILE_MANIFEST_URL_REQUEST";
    public readonly type = ClearFileManifestUrlAction.ACTION_TYPE;
    constructor() {}
}
