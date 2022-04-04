/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying Terra-related state from the HTTP store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { TerraState } from "./terra.state";

/**
 * Get the Terra state from the app state.
 *
 * @type {MemoizedSelector<object, TerraState>}
 */
export const selectTerra = createFeatureSelector<TerraState>("terra");

/**
 * Return the status of the current export to Terra request, if any, and the corresponding export URL.
 *
 * @type {MemoizedSelector<object, TerraState>}
 */
export const selectExportToTerra = createSelector(
    selectTerra,
    (state: TerraState) => state
);
