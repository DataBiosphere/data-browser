/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying system status-related state from the store.
 */

// Core dependencies
import { createFeatureSelector } from "@ngrx/store";

// App dependencies
import { HealthState } from "./health/health.state";
import { IndexState } from "./index/index.state";

// Health status slice
export const selectHealth = createFeatureSelector<HealthState>("health");


// Index status slice
export const selectIndex = createFeatureSelector<IndexState>("index");
