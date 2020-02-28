/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when release data has been successfully read from local JSON.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Release } from "../../releases/2020-march/release";

export class FetchReleasesSuccessAction implements Action {
    public static ACTION_TYPE = "RELEASES.RELEASES_SUCCESS";
    public readonly type = FetchReleasesSuccessAction.ACTION_TYPE;
    constructor(public readonly releases: Release[]) {}
}

