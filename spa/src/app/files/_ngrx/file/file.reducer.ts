/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling file-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileState } from "./file.state";
import { ClearFileFileLocationsAction } from "./clear-file-file-locations.action";
import { FetchFileFileLocationRequestAction } from "./fetch-file-file-location-request.action";
import { FetchFileFileLocationSuccessAction } from "./fetch-file-file-location-success.action";

export function reducer(state: FileState = FileState.getDefaultState(), action: Action): FileState {

    switch (action.type) {

        // Clear file file locations
        case ClearFileFileLocationsAction.ACTION_TYPE:
            return state.clearFileFileLocation(action as ClearFileFileLocationsAction);

        // File file location has been requested - update store
        case FetchFileFileLocationRequestAction.ACTION_TYPE:
            return state.fetchFileFileLocationRequest(action as FetchFileFileLocationRequestAction);

        // File file location has been successfully retrieved from server - update store
        case FetchFileFileLocationSuccessAction.ACTION_TYPE:
            return state.fetchFileFileLocationSuccess(action as FetchFileFileLocationSuccessAction);

        default:
            return state;
    }
}
