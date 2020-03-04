/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project-specific pages should return to the release list page, and not the natural app page.
 * Specifically, project detail back button returns to release list page and not to projects tab.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class SetReleaseReferrerAction implements Action {
    public static ACTION_TYPE = "RELEASES.SET_RELEASE_REFERRER";
    public readonly type = SetReleaseReferrerAction.ACTION_TYPE;
    constructor() {}
}

