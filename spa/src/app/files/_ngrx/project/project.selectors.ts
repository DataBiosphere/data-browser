/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying projject-related state from the store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { ProjectState } from "./project.state";

/**
 * Returns the project-related slice of state.
 */
export const selectProject = createFeatureSelector<ProjectState>("project");

/**
 * Returns map of archive previews keyed by matrix ID, if any, for the specified project.
 */
export const selectProjectMatrixArchivePreviewsByProjectId = (
    projectId: string
) =>
    createSelector(
        selectProject,
        (state) =>
            state.matrixArchivePreviewsByProjectId.get(projectId) || new Map()
    );

/**
 * Returns a map of file locations keyed by file URL, if any, for the specified project.
 */
export const selectProjectMatrixFileLocationsByProjectId = (
    projectId: string
) =>
    createSelector(
        selectProject,
        (state) =>
            state.matrixFileLocationsByProjectId.get(projectId) || new Map()
    );

/**
 * Returns the manifest file location for the specified project.
 */
export const selectProjectManifestFileLocation = (projectId: string) =>
    createSelector(selectProject, (state) =>
        state.manifestFileLocationsByProjectId.get(projectId)
    );

/**
 * Returns the manifest spreadsheet for the specified project.
 */
export const selectProjectManifestSpreadsheet = (projectId: string) =>
    createSelector(selectProject, (state) =>
        state.manifestSpreadsheetsByProjectId.get(projectId)
    );
