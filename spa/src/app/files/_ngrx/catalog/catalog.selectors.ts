/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying catalog-related state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { CatalogState } from "./catalog.state";

/**
 * Get the catalog state from the app state.
 */
export const selectCatalogState = createFeatureSelector<CatalogState>("catalog");

/**
 * Return the current catalog value.
 */
export const selectCatalog = createSelector(selectCatalogState, state => state.catalog);
