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
 * Returns true if catalogs response has been returned from Azul, either success or failure.
 */
export const selectCatalogsInit = createSelector(selectCatalogState, state => state.init);

/**
 * Return the set of catalogs for this instance/atlas.
 */
export const selectCatalogs = createSelector(selectCatalogState, state => state.atlas.catalogs);

/**
 * Return the current selected catalog value.
 */
export const selectCatalog = createSelector(selectCatalogState, state => state.catalog);

/**
 * Return the catalog update.
 */
export const selectCatalogUpdate = createSelector(selectCatalogState, state => state.catalogUpdate);

/**
 * Return the default catalog for the current environment.
 */
export const selectDefaultCatalog = createSelector(selectCatalogState, state => state.atlas.defaultCatalog);

/**
 * Returns true if the catalog has updated since the user's last visit.
 */
export const selectCatalogUpdatedSinceLastVisit = 
    createSelector(selectCatalogState, state => state.catalogUpdatedSinceLastVisit);
