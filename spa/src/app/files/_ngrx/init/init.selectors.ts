/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying init-related state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { InitState } from "./init.state";

/**
 * Get the init state from the app state.
 *
 * @type {MemoizedSelector<object, InitState>}
 */
export const selectInit = createFeatureSelector<InitState>("init");

/**
 * Returns true if the default app filter has been initialized.
 *
 * @type {MemoizedSelector<object, TerraState>}
 */
export const selectDefaultFilterInit =
    createSelector(selectInit, (state: InitState) => state.defaultFilterInit);
