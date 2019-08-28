/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling project-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ProjectState } from "./project.state";
import { FetchProjectTSVUrlSuccessAction } from "./fetch-project-tsv-url-success.action";
import { ClearProjectTSVUrlAction } from "./clear-project-tsv-url.action";

export function reducer(state: ProjectState = ProjectState.getDefaultState(), action: Action): ProjectState {

    switch (action.type) {

        // Clear project TSV URL from the store 
        case ClearProjectTSVUrlAction.ACTION_TYPE:
            return state.clearProjectTSVUrl(action as ClearProjectTSVUrlAction);

        // Project TSV URL (status) has been successfully received from server - update store 
        case FetchProjectTSVUrlSuccessAction.ACTION_TYPE:
            return state.fetchProjectTSVUrlSuccess(action as FetchProjectTSVUrlSuccessAction);

        default:
            return state;
    }
}
