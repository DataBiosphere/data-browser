/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying system status-related state from the store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { HealthState } from "./health/health.state";

// Index status slice
export const selectHealth = createFeatureSelector<HealthState>("health");
