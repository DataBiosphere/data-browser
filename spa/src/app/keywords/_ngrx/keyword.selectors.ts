import { createSelector, createFeatureSelector } from "@ngrx/store";
import { KeywordState } from "./keyword.state";

export const selectKeywords = createFeatureSelector<KeywordState>("keywords");
export const selectKeywordsHits = createSelector(selectKeywords, (state: KeywordState) => state.hits);
