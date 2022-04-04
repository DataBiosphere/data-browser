/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer responsible for updating project edits-related state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FetchProjectEditsRequestAction } from "./fetch-project-edits-request.action";
import { FetchProjectEditsSuccessAction } from "./fetch-project-edits-success.action";
import { ProjectEditsState } from "./project-edits.state";

export function reducer(
    state: ProjectEditsState = ProjectEditsState.getDefaultState(),
    action: Action
): ProjectEditsState {
    switch (action.type) {
        case FetchProjectEditsRequestAction.ACTION_TYPE:
            return state.fetchProjectEditsRequest();

        case FetchProjectEditsSuccessAction.ACTION_TYPE:
            return state.fetchProjectEditsSuccess(
                action as FetchProjectEditsSuccessAction
            );

        default:
            return state;
    }
}
