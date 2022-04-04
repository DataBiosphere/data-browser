/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying config-related state from the config store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { ConfigState } from "./config.state";

/**
 * Get the config state from the app state.
 *
 * @type {MemoizedSelector<object, any>}
 */
export const selectConfig = createFeatureSelector<ConfigState>("config");

/**
 * Return the config from the config state.
 *
 * @type {MemoizedSelector<object, Config>}
 */
export const selectConfigConfig = createSelector(
    selectConfig,
    (state: ConfigState) => state.config
);
