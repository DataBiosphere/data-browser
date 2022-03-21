/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying integrations-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { IntegrationState } from "./integration.state";

/**
 * Returns the integrations-related slice of state.
 */
export const selectIntegrations = createFeatureSelector<IntegrationState>("integration");

/**
 * Returns all integrations, keyed by project ID.
 */
export const selectIntegrationsByProjectId =
    createSelector(selectIntegrations, (state) => state.integrationsByProjectId);

/**
 * Returns the integrations for the specified project ID.
 */
export const selectProjectIntegrations = (projectId: string) =>
    createSelector(selectIntegrations, (state) => state.integrationsByProjectId.get(projectId));
