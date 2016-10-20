/**
 * Repository Summary Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared";
import { RepositorySummary } from "./repository-summary";

/**
 * Types
 */

/**
 * Reducer State
 */
export interface RepositorySummaryState {
    summaryLoaded: boolean;
    summary: RepositorySummary;
}

/**
 * Default State
 */
const DEFAULT_STATE: RepositorySummaryState = {
    summaryLoaded: false,
    summary: {
        fileCount: 0,
        totalFileSize: 0,
        donorCount: 0,
        projectCount: 0,
        primarySiteCount: 0
    }
};

/**
 * Repository Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
export const repositorySummaryReducer: ActionReducer<RepositorySummaryState> = (state = DEFAULT_STATE, action: Action) => {

    switch (action.type) {

        case ACTIONS.RECEIVE_REPOSITORY_SUMMARY:
            return Object.assign({}, state, {
                summaryLoaded: true,
                summary: action.payload
            });
        default:
            return state;
    }
};

/**
 * Selectors
 */
const getRepositorySummaryState = (state$: Observable<RepositorySummaryState>) => {
    return state$.select(state => state);
};
const getRepositorySummary = (state$: Observable<RepositorySummaryState>) => {
    return state$.select(state => state.summary);
};
const getRepositorySummaryLoaded = (state$: Observable<RepositorySummaryState>) => {
    return state$.select(state => state.summaryLoaded);
};

export const repositorySummarySelectors = {
    getRepositorySummaryState,
    getRepositorySummary,
    getRepositorySummaryLoaded
};
