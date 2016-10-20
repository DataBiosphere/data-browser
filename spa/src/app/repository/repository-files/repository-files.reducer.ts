/**
 * Repository Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared";
import { RepositoryFiles, FilePagination } from "./repository-files";

/**
 * Types
 */

/**
 * Reducer State
 */
export interface RepositoryFilesState {
    filesLoaded: boolean;
    files: RepositoryFiles;
}

/**
 * Default State
 */
const DEFAULT_STATE: RepositoryFilesState = {
    filesLoaded: false,
    files: {
        hits: [],
        pagination: {} as FilePagination,
        termFacets: {}
    }
};

/**
 * Repository Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
export const repositoryFilesReducer: ActionReducer<RepositoryFilesState> = (state = DEFAULT_STATE, action: Action) => {

    switch (action.type) {

        // case ACTIONS.RECEIVE_REPOSITORY_SUMMARY:
        //     return Object.assign({}, state, {
        //         summaryLoaded: true,
        //         summary: action.payload
        //     });
        case ACTIONS.RECEIVE_REPOSITORY_FILES:
            return Object.assign({}, state, {
                filesLoaded: true,
                files: action.payload
            });
        default:
            return state;
    }
};

/**
 * Selectors
 */
const getRepositoryFilesState = (state$: Observable<RepositoryFilesState>) => {
    return state$.select(state => state);
};
const getRepositoryFiles = (state$: Observable<RepositoryFilesState>) => {
    return state$.select(state => state.files);
};
const getRepositoryFilesLoaded = (state$: Observable<RepositoryFilesState>) => {
    return state$.select(state => state.filesLoaded);
};

export const repositoryFilesSelectors = {
    getRepositoryFilesState,
    getRepositoryFiles,
    getRepositoryFilesLoaded
};
