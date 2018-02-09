/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Selectors for querying file and donor-related search state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { KeywordState } from "./keyword.state";

/**
 * Return the current search terms from the store.
 * @type {MemoizedSelector<object, KeywordState>}
 */
export const selectKeywords = createFeatureSelector<KeywordState>("keywords");

export const selectKeywordsHits = createSelector(selectKeywords, (state: KeywordState) => state.hits);
