/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Selectors for querying system status-related state from the store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { HealthState } from "./health/health.state";

// Index status slice
export const selectHealth = createFeatureSelector<HealthState>("health");

// Index status - true if system is currently indexing.
export const selectIndexing = createSelector(selectHealth, (state) => state.indexing);
