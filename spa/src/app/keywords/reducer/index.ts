import { ActionReducer } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/filter"
import "rxjs/add/operator/let"

import * as fromKeywords from "./keywords.reducer";
import { Dictionary } from "../../shared/dictionary";

export interface State {
    keywords: fromKeywords.State;
}

export const reducers: Dictionary<ActionReducer<any>> = {
    keywords: fromKeywords.reducer
};

export function selectKeywordsState(state$: Observable<State>): Observable<fromKeywords.State> {
    return state$.select(state => state.keywords);
}

export const selectKeywordsHits = compose(fromKeywords.selectHits, selectKeywordsState);

export const selectKeywordsLoading = compose(fromKeywords.selectLoading, selectKeywordsState);

export const selectKeywordsSearchTerm = compose(fromKeywords.selectSearchTerm, selectKeywordsState);

export function selectKeywordFiles(state$: Observable<State>): Observable<any[]> {
    return selectKeywordsState(state$)
        .filter(state => state.type === "file")
        .let(fromKeywords.selectHits);
}

export function selectKeywordDonors(state$: Observable<State>): Observable<any[]> {
    return selectKeywordsState(state$)
        .filter(state => state.type === "donor") // file-donor
        .let(fromKeywords.selectHits);
}
