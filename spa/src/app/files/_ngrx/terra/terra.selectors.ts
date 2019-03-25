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
 * Return the status of the current export to Terra request, if any.
 *
 * @type {MemoizedSelector<object, ExportToTerraStatus>}
 */
export const selectExportToTerraStatus =
    createSelector(selectTerra, (state: TerraState) => state.exportToTerraStatus);

/**
 * Return the export to Terra URL. Note, the store contains a record of the intermediate polling URL when requesting
 * an export to Terra. Confirm the status of the request is COMPLETE before using this URL as the final export URL.
 *
 * @type {MemoizedSelector<object, ExportToTerraStatus>}
 */
export const selectExportToTerraUrl =
    createSelector(selectTerra, (state: TerraState) => state.exportToTerraUrl);
