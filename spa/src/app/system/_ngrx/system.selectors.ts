/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying system status-related state from the store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { SystemState } from "./system.state";

// Returns system slice from store
export const selectSystem = createFeatureSelector<SystemState>("system");

/**
 * Returns current system status
 *
 * @returns {SystemStatus}
 */
export const selectSystemStatus = createSelector(selectSystem, (systemState: SystemState) => {

    return systemState.systemStatus;
});


