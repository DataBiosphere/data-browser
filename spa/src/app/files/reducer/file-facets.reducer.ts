/**
 * File Facets Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared/boardwalk.actions";
import { FileFacet, Term } from "../file-facets/file-facets";
import { Dictionary } from "../../shared/dictionary";

/**
 * Types
 */
export interface State {
    loading: boolean;
    facetNames: string[];
    facets: {
        [key: string]: FileFacet
    };
}

/**
 * Default State
 */
const DEFAULT_STATE: State = {
    loading: true,
    facetNames: [],
    facets: {}
};

/**
 * File Facets Reducer
 */
export const reducer: ActionReducer<State> = (state = DEFAULT_STATE, action: Action) => {

    switch (action.type) {
        case ACTIONS.REQUEST_FILE_FACETS:
            return Object.assign({}, state, { loading: true });
        case ACTIONS.RECEIVE_FILE_FACETS:
            return initFileFacets(state, action.payload);
        default:
            return state;
    }
};

/**
 * SELECTORS
 */
export const selectLoading = (state$: Observable<State>) => {
    return state$.select(state => state.loading);
};
export const selectAsIterable = (state$: Observable<State>) => {
    return state$
        .map((fileFacets) => {
            return fileFacets.facetNames.map((name) => {
                return fileFacets.facets[name];
            });
        });
};

/**
 * PRIVATES
 */

/**
 * Init Facets
 *
 * @param state
 * @param payload
 */
interface RepositoryFiles {
    termFacets: Dictionary<{terms: Array<{term: string; count: number}>; total: number}>;
}
function initFileFacets(state: State, payload: RepositoryFiles): State {

    const names = Object.keys(payload.termFacets);
    const facets = names.reduce((facetMap, name) => {

        const facet = payload.termFacets[name];

        let terms: Term[];

        // the response from ICGC is missing the terms field instead of being an empty array
        // we need to check it's existence before iterating over it.
        if (facet.terms) {

            terms = facet.terms.map((term) => {
                return {
                    name: term.term,
                    count: term.count,
                    selected: false // this is an unknown default
                };
            });
        }

        facetMap[name] = {
            name: name,
            total: facet.total || 0, // their default is undefined instead of
            terms: terms || [] // default is undefined
        };
        return facetMap;
    }, {});

    return Object.assign({}, state, {
        loading: false,
        facets: facets,
        facetNames: names
    });
}
