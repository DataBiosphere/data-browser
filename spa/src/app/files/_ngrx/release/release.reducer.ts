/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer responsible for updating release-related state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ClearReleaseReferrerAction } from "./clear-release-referrer.action";
import { FetchReleasesRequestAction } from "./fetch-releases-request.action";
import { FetchReleasesSuccessAction } from "./fetch-releases-success.action";
import { ReleaseState } from "./release.state";
import { SetReleaseReferrerAction } from "./set-release-referrer.action";

export function reducer(state: ReleaseState = ReleaseState.getDefaultState(), action: Action): ReleaseState {

    switch (action.type) {

        case ClearReleaseReferrerAction.ACTION_TYPE:
            return state.clearReleaseReferrer();

        case FetchReleasesRequestAction.ACTION_TYPE:
            return state.fetchReleasesByNameRequest();

        case FetchReleasesSuccessAction.ACTION_TYPE:
            return state.fetchReleasesSuccess(action as FetchReleasesSuccessAction);
            
        case SetReleaseReferrerAction.ACTION_TYPE:
            return state.setReleaseReferrer();

        default:
            return state;
    }
}
