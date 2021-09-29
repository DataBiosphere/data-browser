/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling file summary-related actions when displaying the manifest download modal.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ClearFileManifestFileTypeSummaries } from "./clear-file-manifest-file-type.summaries";
import { ClearFileManifestUrlAction } from "./clear-file-manifest-url.action";
import { FetchFileManifestFileTypeSummariesRequestAction } from "./fetch-file-manifest-file-type-summaries-request.action";
import { FetchFileManifestFileTypeSummariesSuccessAction } from "./fetch-file-manifest-file-type-summaries-success.action";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import { FileManifestState } from "./file-manifest.state"
import { FetchProjectFileSummarySuccessAction } from "./fetch-project-file-summary-success.actions";
import { ClearFilesFacetsAction } from "./clear-files-facets.action";
import { FetchFilesFacetsSuccessAction } from "./fetch-files-facets-success.action";
import { SelectProjectFileFacetTermAction } from "./select-project-file-facet-term.action";
import { FetchProjectSpeciesFacetSuccessAction } from "./fetch-project-species-facet-success.action";

export function reducer(state: FileManifestState = FileManifestState.getDefaultState(), action: Action): FileManifestState {

    switch (action.type) {

        // Reset files facets (facets fetched from files endpoint for display on get data pages)
        case ClearFilesFacetsAction.ACTION_TYPE:
            return state.clearFilesFacets();

        // Clear manifest download-specific file type summaries, dispatched by both selected data and project files
        // downloads.
        case ClearFileManifestFileTypeSummaries.ACTION_TYPE:
            return FileManifestState.getDefaultState();

        // Fetch facets from files endpoint for populating facet summary on download pages
        case FetchFilesFacetsSuccessAction.ACTION_TYPE:
            return state.receiveFilesFacets(action as FetchFilesFacetsSuccessAction);

        // Request to fetch manifest download-specific file summary 
        case FetchFileManifestFileTypeSummariesRequestAction.ACTION_TYPE:
            return state.fetchFileTypeSummariesRequest();
        
        // Request to fetch manifest download-specific file summary has successfully completed
        case FetchFileManifestFileTypeSummariesSuccessAction.ACTION_TYPE:
            return state.fetchFileTypeSummariesSuccess(action as FetchFileManifestFileTypeSummariesSuccessAction);

        // Manifest URL request has been cancelled (for example, due to navigation away from download).
        case ClearFileManifestUrlAction.ACTION_TYPE:
            return state.clearFileManifestUrl(action as ClearFileManifestUrlAction);
            
        // Manifest URL request status has been updated - the request status is updated on each poll during manifest
        // download request
        case FetchFileManifestUrlSuccessAction.ACTION_TYPE:
            return state.fetchFileManifestUrlSuccess(action as FetchFileManifestUrlSuccessAction);

        // Project-specific file summary has been received from server - update store.
        case FetchProjectFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchProjectFileSummary(action as FetchProjectFileSummarySuccessAction);
            
        // Term has been selected during download
        case SelectProjectFileFacetTermAction.ACTION_TYPE:
            return state.selectTerm(action as SelectProjectFileFacetTermAction);

        case FetchProjectSpeciesFacetSuccessAction.ACTION_TYPE:
            return state.setProjectSpeciesFacet(action as FetchProjectSpeciesFacetSuccessAction);

        default:
            return state;
    }
}
