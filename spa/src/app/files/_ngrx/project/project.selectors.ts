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
 * Returns a map of file locations keyed by file URL, if any, for the specified project.
 */
export const selectProjectMatrixFileLocationsByProjectId =
        createSelector(selectProject, (state, props) =>
            state.matrixFileLocationsByProjectId.get(props.projectId) || new Map());

/**
 * Returns a map of file locations keyed by file URL, if any, for the specified project.
 */
export const selectProjectMatrixFileLocation =
    createSelector(selectProject, (state, props) => {
        const fileLocationsByFileUrl = state.matrixFileLocationsByProjectId.get(props.projectId) || new Map();
        return fileLocationsByFileUrl.get(props.fileUrl);
    });

/**
 * Returns the current status (ProjectTSVUrlResponse) of the TSV download for the specified project.
 */
export const selectProjectTSVUrlResponseByProjectId =
    createSelector(selectProject, (state, props) =>
        state.projectTSVUrlResponsesByProjectId.get(props.projectId));
