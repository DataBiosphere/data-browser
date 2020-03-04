/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when release files modal should return to the release list page on close, and not the project
 * release tab.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class SetReleaseFilesReferrerAction implements Action {
    public static ACTION_TYPE = "RELEASES.SET_RELEASE_FILES_REFERRER";
    public readonly type = SetReleaseFilesReferrerAction.ACTION_TYPE;
    constructor() {}
}

