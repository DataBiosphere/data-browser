/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project-specific pages should return to the release page, and not the natural app page.
 * Specifically:
 *
 * 1. Project detail back button returns to release page and not to projects tab
 * 2. Release files modal close button returns to release page and not to project detail release tab
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class SetReleaseReferrerAction implements Action {
    public static ACTION_TYPE = "RELEASES.SET_RELEASE_REFERRER";
    public readonly type = SetReleaseReferrerAction.ACTION_TYPE;
    constructor() {}
}

