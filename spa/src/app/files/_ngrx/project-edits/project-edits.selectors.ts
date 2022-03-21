/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying project edits-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectEditsState } from "./project-edits.state";

// App dependencies

/**
 * Returns the project edits-related slice of state.
 */
export const selectProjectEdits = createFeatureSelector<ProjectEditsState>("projectEdits");

/**
 * Returns all projects.
 */
export const selectProjects =
    createSelector(selectProjectEdits, (state) => state.projects);

/**
 * Returns the project edits with the specified ID.
 */
export const selectProjectEditsById = (id: string) =>
    createSelector(selectProjectEdits, (state) => {
        return state.projectsById.get(id) || {};
    });


