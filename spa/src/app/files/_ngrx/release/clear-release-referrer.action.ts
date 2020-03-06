/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when release list page referrer indicator should be cleared. The release list page referrer is used
 * by the project detail page to determine where the back button should navigate to; the release page if the release
 * referrer is set, otherwise the project detail tab.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearReleaseReferrerAction implements Action {
    public static ACTION_TYPE = "RELEASES.CLEAR_RELEASE_REFERRER";
    public readonly type = ClearReleaseReferrerAction.ACTION_TYPE;
    constructor() {}
}

