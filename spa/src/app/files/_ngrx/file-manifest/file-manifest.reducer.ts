/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling file summary-related actions when displaying the manifest download modal.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ClearManifestDownloadFileSummaryAction } from "./clear-manifest-download-file-summary.action";
import { ClearFileManifestUrlAction } from "./clear-file-manifest-url.action";
import { FetchManifestDownloadFileSummaryRequestAction } from "./fetch-manifest-download-file-summary-request.action";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { FileManifestState } from "./file-manifest.state"
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";

export function reducer(state: FileManifestState = FileManifestState.getDefaultState(), action: Action): FileManifestState {

    switch (action.type) {

        // Clear manifest download-specific file summary
        case ClearManifestDownloadFileSummaryAction.ACTION_TYPE:
            return FileManifestState.getDefaultState();

        // Request to fetch manifest download-specific file summary 
        case FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE:
            return state.fetchSummaryRequest();
        
        // Request to fetch manifest download-specific file summary has successfully completed
        case FetchManifestDownloadFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchSummarySuccess(action as FetchManifestDownloadFileSummarySuccessAction);

        // Manifest URL request has been cancelled (for example, due to navigation away from download).
        case ClearFileManifestUrlAction.ACTION_TYPE:
            return state.clearFileManifestUrl(action as ClearFileManifestUrlAction);
            
        // Manifest URL request status has been updated - the request status is updated on each poll during manifest
        // download request
        case FetchFileManifestUrlSuccessAction.ACTION_TYPE:
            return state.fetchFileManifestUrlSuccess(action as FetchFileManifestUrlSuccessAction);
            
        default:
            return state;
    }
}
