/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying file manifest-related state from the file store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { FileManifestState } from "./file-manifest.state";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";

/**
 * Get the file manifest state from the app state.
 */
export const selectFileManifest = createFeatureSelector<FileManifestState>("fileManifest");

/**
 * Return the set of file facets, returned from the files endpoint, from the store.
 */
export const selectFilesFacets = createSelector(selectFileManifest, (state) => {
    return state.filesFacets;
});

/**
 * Return the file type summaries for the file manifest download (reused for project metadata, bulk download
 * export to Terra, project bulk download or project export to Terra).
 */
export const selectFileManifestFileTypeSummaries =
    createSelector(selectFileManifest, (state: FileManifestState) => state.fileTypeSummaries);

/**
 * Return the status of the current manifest URL request.
 * 
 * TODO
 * Potentially generalise naming here? 
 */
export const selectFileManifestManifestResponse =
    createSelector(selectFileManifest, (state: FileManifestState) => state.manifestResponse);

/**
 * Return the file format files facet from the store.
 *
 * TODO
 * Currently only used by project downloads. Can be generalised to be reused by get data flows once get data functionality
 * is updated to use download-specific selected search terms rather than app-wide search state.
 */
export const selectProjectFileFormatsFileFacet = createSelector(selectFileManifest, (state) => {
    return state.filesFacets.find((facet) => facet.name === FileFacetName.FILE_FORMAT);
});

/**
 * Return the project-specific file summary.
 */
export const selectProjectFileSummary =
    createSelector(selectFileManifest, (state: FileManifestState) => state.projectFileSummary);

/**
 * Return the project download-specific search terms.
 */
export const selectProjectSelectedSearchTerms =
    createSelector(selectFileManifest, (state: FileManifestState) => state.selectedProjectSearchTerms);
