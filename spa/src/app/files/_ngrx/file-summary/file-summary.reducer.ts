/**
 * File Summary Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
import { FetchFileSummaryRequestAction, FetchFileSummarySuccessAction } from "./file-summary.actions";
import { FileSummaryState } from "./file-summary.state";
import { Action } from "@ngrx/store";

export function reducer(state: FileSummaryState = FileSummaryState.getDefaultState(), action: Action): FileSummaryState {

    switch (action.type) {
        case FetchFileSummaryRequestAction.ACTION_TYPE:
            return state.fetchSummaryRequest();
        case FetchFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchSummarySuccess(action as FetchFileSummarySuccessAction);
        default:
            return state;
    }
}
