/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when release files modal referrer indicator should be cleared.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearReleaseFilesReferrerAction implements Action {
    public static ACTION_TYPE = "RELEASES.CLEAR_RELEASE_FILES_REFERRER";
    public readonly type = ClearReleaseFilesReferrerAction.ACTION_TYPE;
    constructor() {}
}

