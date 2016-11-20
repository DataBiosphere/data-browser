/**
 * File Summary Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared/boardwalk.actions";
import { FileSummary } from "../file-summary";

/**
 * Types
 */

/**
 * Reducer State
 */
export interface State {
    loading: boolean;
    summary: FileSummary;
}

/**
 * Default State
 */
const DEFAULT_STATE: State = {
    loading: true,
    summary: {
        fileCount: 0,
        totalFileSize: 0,
        donorCount: 0,
        projectCount: 0,
        primarySiteCount: 0
    }
};

/**
 * File Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
export const reducer: ActionReducer<State> = (state = DEFAULT_STATE, action: Action) => {

    switch (action.type) {

        case ACTIONS.REQUEST_FILE_SUMMARY:
            return Object.assign({}, state, { loading: true });
        case ACTIONS.RECEIVE_FILE_SUMMARY:
            return Object.assign({}, state, {
                loading: false,
                summary: action.payload
            });
        default:
            return state;
    }
};

/**
 * Selectors
 */
export const selectState = (state$: Observable<State>) => {
    return state$.select(state => state);
};
export const selectFileSummary = (state$: Observable<State>) => {
    return state$.select(state => state.summary);
};
export const selectFileSummaryLoading = (state$: Observable<State>) => {
    return state$.select(state => state.loading);
};
