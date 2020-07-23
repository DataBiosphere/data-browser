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
 * Returns the current status (ProjectTSVUrlResponse) of the TSV download for the speciifed project.
 */
export const selectProjectTSVUrlResponseByProjectId =
    createSelector(selectProject, (state, props) => state.projectTSVUrlResponsesByProjectId.get(props.projectId));
