/**
 * File Summary Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared/boardwalk.actions";
import { FileSummary } from "./";

/**
 * Types
 */

/**
 * Reducer State
 */
export interface FileSummaryState {
    loading: boolean;
    summary: FileSummary;
}

/**
 * Default State
 */
const DEFAULT_STATE: FileSummaryState = {
    loading: true,
    summary: {
        fileCount: 0,
        totalFileSize: 0,
        donorCount: 0,
        projectCount: 0,
        primarySiteCount: 0,
        primarySite: 0
    }
};

/**
 * File Summary Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
export const reducer: ActionReducer<FileSummaryState> = (state: FileSummaryState = DEFAULT_STATE, action: Action) => {

    console.log(action.type);

    switch (action.type) {
        case ACTIONS.REQUEST_FILE_SUMMARY:
            return Object.assign({}, state, { loading: true });
        case ACTIONS.FILE_SUMMARY_RECEIVED:
            return Object.assign({}, state, {
                loading: false,
                summary: action.payload
            });
        default:
            return state;
    }
};

/**
 * File Summary Selectors
 */

export const selectFileSummaryState = (fileSummaryState: Observable<FileSummaryState>) => {
    return fileSummaryState.select(fss => fss);
};

export const selectFileSummary = (fileSummaryState: Observable<FileSummaryState>) => {
    return fileSummaryState.select(fss => fss.summary);
};

export const selectFileSummaryLoading = (fileSummaryState: Observable<FileSummaryState>) => {
    return fileSummaryState.select(fss => fss.loading);
};
