/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling project-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ClearProjectMatrixFileLocationsAction } from "./clear-project-matrix-file-locations.action";
import { ClearProjectTSVUrlAction } from "./clear-project-tsv-url.action";
import { FetchProjectMatrixFileLocationRequestAction } from "./fetch-project-matrix-file-location-request.action";
import { FetchProjectMatrixFileLocationSuccessAction } from "./fetch-project-matrix-file-location-success.action";
import { FetchProjectTSVUrlSuccessAction } from "./fetch-project-tsv-url-success.action";
import { ProjectState } from "./project.state";

export function reducer(state: ProjectState = ProjectState.getDefaultState(), action: Action): ProjectState {

    switch (action.type) {
        
        // Clear project matrix file locations
        case ClearProjectMatrixFileLocationsAction.ACTION_TYPE:
            return state.clearProjectMatrixFileLocations(action as ClearProjectMatrixFileLocationsAction);

        // Clear project TSV URL from the store 
        case ClearProjectTSVUrlAction.ACTION_TYPE:
            return state.clearProjectTSVUrl(action as ClearProjectTSVUrlAction);

        // Project matrix file location has been requested - update store
        case FetchProjectMatrixFileLocationRequestAction.ACTION_TYPE:
            return state.fetchProjectMatrixFileLocationRequest(action as FetchProjectMatrixFileLocationRequestAction);

        // Project matrix file location has been successfully retrieved from server - update store
        case FetchProjectMatrixFileLocationSuccessAction.ACTION_TYPE:
            return state.fetchProjectMatrixFileLocationSuccess(action as FetchProjectMatrixFileLocationSuccessAction);

        // Project TSV URL (status) has been successfully received from server - update store 
        case FetchProjectTSVUrlSuccessAction.ACTION_TYPE:
            return state.fetchProjectTSVUrlSuccess(action as FetchProjectTSVUrlSuccessAction);

        default:
            return state;
    }
}
