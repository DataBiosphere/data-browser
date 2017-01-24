/**
 * File Facets Reducer
 *
 * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared/boardwalk.actions";
import { FileFacetSelectedEvent } from "./file-facet.events";
import { FileFacetsState } from "./file-facet-state.model";
import { FileFacet } from "../shared/file-facet.model";

const DEFAULT_STATE = new FileFacetsState([], new Map<string, FileFacet>(), true, undefined);

/**
 * File Facets Reducer
 */
export const reducer: ActionReducer<FileFacetsState> = (fileFacetsState: FileFacetsState = DEFAULT_STATE, action: Action) => {

    switch (action.type) {
        case ACTIONS.FILE_FACETS_REQUESTED:
            return fileFacetsState.setLoading(true);
        case ACTIONS.FILE_FACET_SELECTED:
            const event = <FileFacetSelectedEvent> action.payload;
            return fileFacetsState.selectTerm(event.facet, event.term);
        case ACTIONS.FILE_FACETS_RECEIVED:
            return fileFacetsState.setFileFacets(action.payload);
        case ACTIONS.CLEAR_SELECTED_FACET:
            return fileFacetsState.clearSelectedFacet();
        default:
            return fileFacetsState;
    }
};

/**
 * SELECTORS
 */
export const selectLoading = (fileFacetsState$: Observable<FileFacetsState>) => {
    return fileFacetsState$.map(fileFacetsState => fileFacetsState.loading);
};

export const selectFileFacets = (fileFacetsState$: Observable<FileFacetsState>): Observable<FileFacet[]> => {
    return fileFacetsState$
        .map((fileFacetState) => {
            return fileFacetState.fileFacets;
        });
};

export const selectSelectedFacet = (fileFacetsState$: Observable<FileFacetsState>): Observable<FileFacet> => {
    return fileFacetsState$
        .map((fileFacetState) => {
            return fileFacetState.selectedFacet;
        });
};

