import { ActionReducer, createSelector, createFeatureSelector } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/let";

import * as fromKeywords from "./keywords.reducer";
import { Dictionary } from "../../shared/dictionary";

export interface State {
    keywords: fromKeywords.State;
}

export const reducers: Dictionary<ActionReducer<any>> = {
    keywords: fromKeywords.reducer
};

// export function selectKeywordsState(state$: Observable<State>): Observable<fromKeywords.State> {
//     return state$.map(state => state.keywords);
// }

// export function selectKeywordFiles(state$: Observable<State>): Observable<any[]> {
//     return selectKeywordsState(state$)
//         .filter(state => state.type === "file")
//         .let(fromKeywords.selectHits);
// }
//
// export function selectKeywordDonors(state$: Observable<State>): Observable<any[]> {
//     return selectKeywordsState(state$)
//         .filter(state => state.type === "donor") // file-donor
//         .let(fromKeywords.selectHits);
// }



export const selectKeywords = createFeatureSelector<fromKeywords.State>("keywords");
export const selectKeywordsHits = createSelector(selectKeywords, (state: fromKeywords.State) => state.hits);

// export const selectKeywordsLoading = createSelector(selectKeywords, (state) => state.loading);
// export const selectKeywordsSearchTerm = createSelector(selectKeywords, (state) => state.searchTerm);
