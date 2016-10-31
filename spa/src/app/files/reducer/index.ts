import { ActionReducer } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { Observable } from "rxjs/Observable";
import {} from "rxjs/observable/";
import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/let";
import "rxjs/add/operator/withLatestFrom";

import * as includes from "lodash/includes";

import * as fromSummary from "./file-summary.reducer";
import * as fromFacets from "./file-facets.reducer";
import * as fromFilters from "./file-filters.reducer";
import { FileFacet } from "../file-facets/file-facets";

export interface State {
    fileSummary: fromSummary.State;
    fileFacets: fromFacets.State;
    fileFilters: fromFilters.State;
}

export const reducers = {
    fileSummary: fromSummary.reducer,
    fileFacets: fromFacets.reducer,
    fileFilters: fromFilters.reducer
};

/**
 * File Summary Selectors
 *
 * @param state$
 * @returns {Observable<R>}
 */
function selectFileSummaryState(state$: Observable<State>): Observable<fromSummary.State> {
    return state$.select(state => state.fileSummary);
}
export const selectFileSummary = compose(fromSummary.selectFileSummary, selectFileSummaryState);
export const selectFileSummaryLoading = compose(fromSummary.selectFileSummaryLoading, selectFileSummaryState);

/**
 * File Filters Selectors
 *
 * @param state$
 * @returns {Observable<R>}
 */
export function selectFileFiltersState(state$: Observable<State>): Observable<fromFilters.State> {
    return state$.select(state => state.fileFilters);
}
export const selectFileFilters = compose(fromFilters.selectFilters, selectFileFiltersState);
export const selectFileFiltersLoading = compose(fromFilters.selectLoading, selectFileFiltersState);
export const selectFiltersAsQuery = compose(fromFilters.selectFiltersAsQuery, selectFileFiltersState);

/**
 * File Facet Selectors
 *
 * @param state$
 * @returns {Observable<R>}
 */
export function selectFileFacetsState(state$: Observable<State>): Observable<fromFacets.State> {
    return state$.select(state => state.fileFacets);
}
export const selectFileFacetsLoading = compose(fromFacets.selectLoading, selectFileFacetsState);
export const selectFileFacetsIterable = compose(fromFacets.selectAsIterable, selectFileFacetsState);

/**
 * Select the Filters including a selected status
 *
 * @param state$
 * @returns {Observable<R>}
 */
export const selectUserStateFileFacets = (state$: Observable<State>): Observable<FileFacet[]> => {

    return selectFileFacetsIterable(state$)
        .withLatestFrom(selectFileFiltersState(state$), (facets: FileFacet[], filterState: fromFilters.State) => {

            // iterate throught facets, marking as selected
            return facets.map((facet) => {

                // if a filter has options selected, go through marking selected as needed.
                // if none of those filters are selected, don't bother iterating.
                if (filterState.filters[facet.name].length) {

                    // map the terms, marking selected as selected.
                    facet.terms = facet.terms.map((term) => {
                        if (includes(filterState.filters[facet.name], term.name)) {
                            return Object.assign({}, term, {selected: true});
                        }
                        else {
                            return term;
                        }
                    });
                }
                return facet;
            });
        });
};
