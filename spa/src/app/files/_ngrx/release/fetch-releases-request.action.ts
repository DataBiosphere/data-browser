/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered on load of app, to read local JSON release data into store.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchReleasesRequestAction implements Action {
    public static ACTION_TYPE = "RELEASES.RELEASES_REQUEST";
    public readonly type = FetchReleasesRequestAction.ACTION_TYPE;
    constructor() {}
}

