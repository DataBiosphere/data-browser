/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying file-related state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { FileState } from "./file.state";

/**
 * Get the file state from the files state.
 */
export const selectFile = createFeatureSelector<FileState>("file");

/**
 * Returns the set of file locations.
 */
export const selectFileFileLocations = createSelector(
    selectFile,
    (state) => state.fileFileLocationsByFileUrl
);

/**
 * Returns the file location for the given file.
 */
export const selectFileFileLocationByFileUrl = (fileUrl: string) =>
    createSelector(selectFile, (state) =>
        state.fileFileLocationsByFileUrl.get(fileUrl)
    );
