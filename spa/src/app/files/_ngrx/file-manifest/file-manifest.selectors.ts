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
 * Return the file type summaries for the file manifest download (reused for project metadata, bulk download
 * export to Terra, project bulk download or project export to Terra).
 */
export const selectFileManifestFileTypeSummaries =
    createSelector(selectFileManifest, (state: FileManifestState) => state.fileTypeSummaries);

/**
 * Return the status of the current manifest URL request.
 */
export const selectFileManifestManifestResponse =
    createSelector(selectFileManifest, (state: FileManifestState) => state.manifestResponse);

/**
 * Return the project-specific file summary.
 */
export const selectProjectFileSummary =
    createSelector(selectFileManifest, (state: FileManifestState) => state.projectFileSummary);
