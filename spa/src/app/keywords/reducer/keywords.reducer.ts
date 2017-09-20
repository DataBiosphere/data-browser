/**
 * Repository Files Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/keyword/findAll
 */
import { Action, ActionReducer } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";

import { ACTIONS } from "../../shared/boardwalk.actions";

/**
 * Types
 */

/**
 * Reducer State
 */
export interface State {
    loading: boolean;
    searchTerm: string;
    type: string;
    hits: any[];
    pagination: any; // todo pagination object;
}

/**
 * Default State
 *
 */
const DEFAULT_STATE: State = {
    loading: false,
    searchTerm: "",
    type: "",
    hits: [],
    pagination: {}
};

interface BwAction extends Action {
    payload: any;
}

/**
 * Repository Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
export const reducer: ActionReducer<State> = (state = DEFAULT_STATE, action: BwAction) => {

    switch (action.type) {

        case ACTIONS.REQUEST_KEYWORDS_QUERY:
            return requestKeywordsQuery(state, action.payload);
        case ACTIONS.RECEIVE_KEYWORDS_QUERY:
            return receiveKeywordsQuery(state, action.payload);
        case ACTIONS.CLEAR_KEYWORDS_QUERY:
            return clearKeywordsQuery(state, action.payload);
        default:
            return state;
    }
};

/**
 * Selectors
 */
// export const selectLoading = (state$: Observable<State>) => {
//     return state$.map(state => state.loading);
// };
// export const selectHits = (state$: Observable<State>) => {
//     return state$.map(state => state.hits);
// };
// export const selectSearchTerm = (state$: Observable<State>) => {
//     return state$.map(state => state.searchTerm);
// };

/**
 * PRIVATES
 */
function requestKeywordsQuery(state: State, payload: {searchTerm: string; type: string}): State {

    return Object.assign({}, state, {
        loading: true
    }, payload);
}

function receiveKeywordsQuery(state: State, payload: { pagination: any, hits: any[] }): State {

    return Object.assign({}, state, {
        loading: false,
        hits: payload.hits,
        pagination: Object.assign({}, state.pagination, payload.pagination)
    });
}


function clearKeywordsQuery(state: State, payload): State {
    return Object.assign({}, state, {
        loading: false,
        searchTerm: "",
        hits: []
    }, payload);
}
