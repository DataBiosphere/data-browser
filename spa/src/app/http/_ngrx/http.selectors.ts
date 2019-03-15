/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Selectors for querying HTTP-related state from the HTTP store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { HttpState } from "./http.state";

/**
 * Get the HTTP state from the app state.
 *
 * @type {MemoizedSelector<object, HttpState>}
 */
export const selectHTTP = createFeatureSelector<HttpState>("http");

/**
 * Return the HTTP status code from the HTTP state.
 *
 * @type {MemoizedSelector<object, number>}
 */
export const selectStatusCode = createSelector(selectHTTP, (state: HttpState) => state.statusCode);

/**
 * Return the error message from the HTTP state.
 *
 * @type {MemoizedSelector<object, string>}
 */
export const selectErrorMessage = createSelector(selectHTTP, (state: HttpState) => state.errorMessage);

/**
 * Return the request URL from the HTTP state.
 *
 * @type {MemoizedSelector<object, string>}
 */
export const selectRequestUrl = createSelector(selectHTTP, (state: HttpState) => state.requestUrl);
