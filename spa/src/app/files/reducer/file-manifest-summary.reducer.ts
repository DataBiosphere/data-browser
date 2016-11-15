/**
 * Repository Files Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository/getManifestSummary
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared";

import { Dictionary } from "../../shared/dictionary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { Selector } from "../../shared/selector";
/**
 * Types
 */

/**
 * Reducer State
 */
export interface State {
    loading: boolean;
    repoNames: string[];
    repositories: Dictionary<FileManifestSummary>;
}

/**
 * Default State
 *
 */
const DEFAULT_STATE: State = {
    loading: true,
    repoNames: [],
    repositories: {}
};

/**
 * Repository Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
export const reducer: ActionReducer<State> = (state = DEFAULT_STATE, action: Action) => {

    switch (action.type) {

        case ACTIONS.RECEIVE_FILE_MANIFEST_SUMMARY:
            return receiveFileManifestSummary(state, action.payload);
        case ACTIONS.REQUEST_FILE_MANIFEST_SUMMARY:
            return requestFileManifestSummary(state);
        case ACTIONS.RECEIVE_DOWNLOAD_FILE_MANIFEST:
            return Object.assign({}, state, DEFAULT_STATE);
        default:
            return state;
    }
};

/**
 * Selectors
 */
export const selectLoading: Selector<boolean> = (state$: Observable<State>) => {
    return state$.select(state => state.loading);
};
export const selectRepositoryManifestSummaries: Selector<FileManifestSummary[]> = (state$: Observable<State>) => {

    return state$.select(state => state)
        .map((state: State) => {
            return state.repoNames.map((name) => {
                return state.repositories[name];
            });
        });
};

/**
 * PRIVATES
 */

/**
 * Receive Action
 */
function receiveFileManifestSummary(state: State, payload: Dictionary<FileManifestSummary>): State {

    const repoNames = Object.keys(payload);
    repoNames.forEach((name) => {
        payload[name].repoName = name;
    });

    return Object.assign({}, state, {
        loading: false,
        repoNames: repoNames,
        repositories: payload
    });
}

/**
 * Request Action
 */
function requestFileManifestSummary(state: State): State {
    return Object.assign({}, state, {
        loading: true
    });
}
