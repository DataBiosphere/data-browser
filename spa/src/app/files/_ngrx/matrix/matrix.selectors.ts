/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying matrix-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { MatrixState } from "./matrix.state";

/**
 * Returns the matrix-related slice of state.
 */
export const selectMatrix = createFeatureSelector<MatrixState>("matrix");

/**
 * Returns the set of possible file formats for the Matrix URL request
 */
export const selectMatrixFileFormats = createSelector(selectMatrix, (state) => state.fileFormats);

/**
 * Returns the status of the current matrix URL request.
 */
export const selectMatrixResponse = createSelector(selectMatrix, (state) => state.matrixResponse);

/**
 * Returns the current set of cached per-project matrix URLs
 */
export const selectProjectMatrixUrls = createSelector(selectMatrix, (state) => state.matrixUrlsByProjectId);
