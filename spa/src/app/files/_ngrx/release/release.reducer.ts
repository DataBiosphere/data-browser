/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer responsible for updating release-related state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ReleaseState } from "./release.state";
import { FetchReleasesRequestAction } from "./fetch-releases-request.action";
import { FetchReleasesSuccessAction } from "./fetch-releases-success.action";

export function reducer(state: ReleaseState = ReleaseState.getDefaultState(), action: Action): ReleaseState {

    switch (action.type) {

        case FetchReleasesRequestAction.ACTION_TYPE:
            return state.fetchReleasesByNameRequest();

        case FetchReleasesSuccessAction.ACTION_TYPE:
            return state.fetchReleasesSuccess(action as FetchReleasesSuccessAction);

        default:
            return state;
    }
}
