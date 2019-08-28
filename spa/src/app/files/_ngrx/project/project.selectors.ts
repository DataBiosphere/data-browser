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
 * Returns the map of project TSV URLs keyed by project ID.
 */
export const selectProjectTSVUrlsByProjectId =
    createSelector(selectProject, (state, props) => state.projectTSVUrlResponsesByProjectId.get(props.projectId));
