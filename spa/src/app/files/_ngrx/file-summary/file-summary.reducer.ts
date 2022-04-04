/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling file summary-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import {
    FetchFileSummaryRequestAction,
    FetchFileSummarySuccessAction,
} from "./file-summary.actions";
import { FileSummaryState } from "./file-summary.state";

export function reducer(
    state: FileSummaryState = FileSummaryState.getDefaultState(),
    action: Action
): FileSummaryState {
    switch (action.type) {
        case FetchFileSummaryRequestAction.ACTION_TYPE:
            return state.fetchSummaryRequest();

        case FetchFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchSummarySuccess(
                action as FetchFileSummarySuccessAction
            );

        default:
            return state;
    }
}
