/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when release referrer indicator should be cleared.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearReleaseReferrerAction implements Action {
    public static ACTION_TYPE = "RELEASES.CLEAR_RELEASE_REFERRER";
    public readonly type = ClearReleaseReferrerAction.ACTION_TYPE;
    constructor() {}
}

