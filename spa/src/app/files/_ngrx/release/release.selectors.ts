/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying release-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { ReleaseState } from "./release.state";

/**
 * Returns the release-related slice of state.
 */
export const selectReleases = createFeatureSelector<ReleaseState>("release");

/**
 * Returns all releases, keyed by release name
 */
export const selectReleasesByName =
    createSelector(selectReleases, (state) => state.releasesByName);

/**
 * Returns the release with the specified name
 */
export const selectReleaseByName =
    createSelector(selectReleases, (state, props) => state.releasesByName.get(props.name));

/**
 * Returns the release with only the specified project, if project is a part of the release.
 */
export const selectReleaseByNameAndProjectId =
    createSelector(selectReleases, (state, props) => {
        const release = state.releasesByName.get(props.name);
        const project = release.projects.find(project => project.entryId === props.projectId);
        return Object.assign({}, release, {
            projects: project ? [project] : []
        });
    });

/**
 * Return the release referrer.
 */
export const selectReleaseReferrer =
    createSelector(selectReleases, (state) => state.releaseReferrer);

/**
 * XXX TODO Mim
 */
export const selectDataset =
    createSelector(selectReleases, (state, props) => {
        const release = state.releasesByName.get(props.name);
        const project = release.projects.find(project => project.entryId === props.projectId);
        return {
            entryId: project.entryId,
            projectShortname: project.projectShortname,
            projectData: project.datasets.find(dataset => dataset.datasetId === props.datasetId)
        };
    });

