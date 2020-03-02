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
 * Return the release referrer.
 */
export const selectReleaseReferrer =
    createSelector(selectReleases, (state) => state.releaseReferrer);
