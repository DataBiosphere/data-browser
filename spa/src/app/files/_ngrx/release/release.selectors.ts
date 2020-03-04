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
export const selectReleaseByProjectId =
    createSelector(selectReleases, (state, props) => {
        
        const release = state.releasesByName.get(props.name);
        
        // Filter down the set of projects in this release to just the project we are looking for
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
 * Return the release files referrer.
 */
export const selectReleaseFilesReferrer =
    createSelector(selectReleases, (state) => state.releaseFilesReferrer);

/**
 * Return the dataset with the specified ID, for the specified project and release.
 */
export const selectReleaseByDataset =
    createSelector(selectReleases, (state, props) => {
        
        const release = state.releasesByName.get(props.name);
        const project = release.projects.find(project => project.entryId === props.projectId);
        
        // If project is not part of the release, return release with an empty array of projects
        if ( !project ) {
            return Object.assign({}, release, {
                projects: []
            });
        }

        // Filter the datasets down the one we are looking for and modify the project to contain just that single dataset.
        const dataset = project.datasets.find(dataset => dataset.datasetId === props.datasetId);
        const projectWithFilteredDatasets = Object.assign({}, project, {
            datasets: dataset ? [dataset] : []
        });
        
        // Return release containing just the project and dataset we're looking for
        return Object.assign({}, release, {
            projects: [projectWithFilteredDatasets]
        });
    });

