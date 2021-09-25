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

export function reducer(state: FileManifestState = FileManifestState.getDefaultState(), action: Action): FileManifestState {

    switch (action.type) {

        // Clear manifest download-specific file type summaries, dispatched by both selected data and project files
        // downloads.
        case ClearFileManifestFileTypeSummaries.ACTION_TYPE:
            return FileManifestState.getDefaultState();

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
            
        default:
            return state;
    }
}
