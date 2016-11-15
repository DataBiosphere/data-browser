/**
 * Repository Files Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository/findAll
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared";

import * as includes from "lodash/includes";
import * as indexOf from "lodash/indexOf";
import { Dictionary } from "../../shared/dictionary";

/**
 * Types
 */

/**
 * Reducer State
 */
export interface State {
    loading: boolean;
    filters: {
        [key: string]: string[];
    };
    include: string;
    from: number;
    size: number;
}

/**
 * Default State
 *
 */
const DEFAULT_STATE: State = {
    loading: true,
    from: 1,
    size: 1, // they don't accept zero...
    include: "facets",
    filters: {
        id: [],
        donorId: [],
        access: [],
        dataType: [],
        donorStudy: [],
        experimentalStrategy: [],
        fileFormat: [],
        primarySite: [],
        projectCode: [],
        repoName: [],
        repositoryDonors: [], // selecting this is a 400 error
        repositorySizes: [], // selecting this is a 400 error
        software: [],
        specimenType: [],
        study: []
    }
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

        case ACTIONS.RECEIVE_FILE_FILTERS:
            return initFromQueryParams(state, action.payload);
        case ACTIONS.SELECT_FILE_FILTER:
            return selectFileFilter(state, action.payload);
        default:
            return state;
    }
};

/**
 * Selectors
 */
export const selectLoading = (state$: Observable<State>) => {
    return state$.select(state => state.loading);
};
export const selectFilters = (state$: Observable<State>) => {
    return state$.select(state => state.filters);
};
export const selectFiltersIterable = (state$: Observable<State>) => {
    return state$
        .map(state => state.filters)
        .map((filters) => {
            const keys = Object.keys(filters);
            return keys.map((key) => {
                return {
                    facet: key,
                    terms: filters[key]
                };
            });
        });
};
export const selectFiltersAsQuery = (state$: Observable<State>) => {
    return state$
        .map((state) => {
            return {
                filters: filtersToQuerystring(state.filters),
                include: state.include,
                from: state.from,
                size: state.size
            };
        });
};

/**
 * PRIVATES
 */
function initFromQueryParams(state: State, payload: State): State {

    return Object.assign({}, state, {
        loading: false,
        filters: Object.assign({}, state.filters, payload.filters)
    });
}

/**
 * Select Filter
 *
 * @param state
 * @param payload
 * @returns {State}
 */
function selectFileFilter(state: State, payload: {facet: string; term: string}): State {

    // if the filters don't include this facet, add the facet and add the term to that facet
    if (!includes(state.filters[payload.facet], payload.term)) {
        return addFileFilter(state, payload);
    }
    return removeFileFilter(state, payload);
}

/**
 * Add Filter
 *
 * @param state
 * @param payload
 * @returns {({}&State&{filters: {}})|any}
 */
function addFileFilter(state: State, payload: {facet: string; term: string}): State {
    return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, {
            [payload.facet]: [
                ...state.filters[payload.facet],
                payload.term
            ]
        })
    });
}

/**
 * Remove Filter
 * @param state
 * @param payload
 * @returns {({}&State&{filters: {}})|any}
 */
function removeFileFilter(state: State, payload: {facet: string; term: string}): State {
    const termIndex = indexOf(state.filters[payload.facet], payload.term);
    return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, {
            [payload.facet]: [
                ...state.filters[payload.facet].slice(0, termIndex),
                ...state.filters[payload.facet].slice(termIndex + 1)
            ]
        })
    });
}

/**
 * Filter To Querystring
 *
 * return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
 * if there aren't any file filters, it's just { }, not { file: { } }
 *
 * @param filters
 * @returns {string}
 */
function filtersToQuerystring(filters: Dictionary<string[]>): string {

    const keys = Object.keys(filters);
    const file = keys.reduce((fileFilter, key) => {
        if (filters[key].length) {
            fileFilter[key] = { is: filters[key]};
        }
        return fileFilter;
    }, {});

    // empty object if it doesn't have any filters;
    const fileFilter = Object.keys(file).length ? { file: file } : {};
    return JSON.stringify(fileFilter);
}
