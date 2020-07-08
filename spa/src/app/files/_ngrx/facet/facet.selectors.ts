/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying facet-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { FacetState } from "./facet.state";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";


/**
 * Return facet slice. 
 */
export const selectFacet = createFeatureSelector<FacetState>("facet");

/**
 * Return the full set of facets from the store: both file facets (facets with term lists) as well as range facets.
 */
export const selectFacetFacets = createSelector(selectFacet, (state) => {
    return state.facets;
});

/**
 * Return the list of file facets from the store.
 */
export const selectFacetFileFacets = createSelector(selectFacet, (state) => {
    return state.fileFacets;
});

/**
 * Return the set of file facets, returned from the files endpoint, from the store.
 */
export const selectFilesFacets = createSelector(selectFacet, (state) => {
    return state.filesFacets;
});

/**
 * Return the file format facet from the store.
 */
export const selectFileFormatsFileFacet = createSelector(selectFacet, (state) => {
    return state.fileFacets.find((facet) => facet.name === FileFacetName.FILE_FORMAT);
});

/**
 * Returns true if current search terms yield matrixable data.
 */
export const selectMatrixSupported = createSelector(selectFacet, (state) => {
    return state.matrixSupported;
});
