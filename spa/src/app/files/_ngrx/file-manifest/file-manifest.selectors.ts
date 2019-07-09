/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying file manifest-related state from the file store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { FileManifestState } from "./file-manifest.state";

/**
 * Get the file manifest state from the app state.
 */
export const selectFileManifest = createFeatureSelector<FileManifestState>("fileManifest");

/**
 * Return the file summary counts for the file manifest download.
 */
export const selectFileManifestFileSummary =
    createSelector(selectFileManifest, (state: FileManifestState) => state.fileSummary);

/**
 * Return the status of the current manifest URL request.
 */
export const selectFileManifestManifestResponse =
    createSelector(selectFileManifest, (state: FileManifestState) => state.manifestResponse);
