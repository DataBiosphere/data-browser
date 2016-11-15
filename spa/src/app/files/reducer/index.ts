import { ActionReducer } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/withLatestFrom";

import * as includes from "lodash/includes";

import * as fromSummary from "./file-summary.reducer";
import * as fromFacets from "./file-facets.reducer";
import * as fromFilters from "./file-filters.reducer";
import * as fromManifestSummary from "./file-manifest-summary.reducer";

import { FileFacet } from "../file-facets/file-facets";
import { Selector } from "../../shared/selector";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { Dictionary } from "../../shared/dictionary";

export interface State {
    fileSummary: fromSummary.State;
    fileFacets: fromFacets.State;
    fileFilters: fromFilters.State;
    fileManifestSummary: fromManifestSummary.State;
}

export const reducers: Dictionary<ActionReducer<any>> = {
    fileSummary: fromSummary.reducer,
    fileFacets: fromFacets.reducer,
    fileFilters: fromFilters.reducer,
    fileManifestSummary: fromManifestSummary.reducer
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
                            return Object.assign({}, term, { selected: true });
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

export function selectManifestSummary(state$: Observable<State>): Observable<fromManifestSummary.State> {
    return state$.select(state => state.fileManifestSummary);
}
export const selectManifestSummaryLoading: Selector<boolean> = compose(fromManifestSummary.selectLoading, selectManifestSummary);
export const selectRepositoryManifestSummaries: Selector<FileManifestSummary[]> =
    compose(fromManifestSummary.selectRepositoryManifestSummaries, selectManifestSummary);
