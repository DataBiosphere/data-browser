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
import { FetchManifestDownloadFileSummaryRequestAction } from "./fetch-manifest-download-file-summary-request.action";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { FileManifestState } from "./file-manifest.state"
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";

export function reducer(state: FileManifestState = FileManifestState.getDefaultState(), action: Action): FileManifestState {

    switch (action.type) {

        case FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE:
            return state.fetchSummaryRequest();

        case FetchManifestDownloadFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchSummarySuccess(action as FetchManifestDownloadFileSummarySuccessAction);

        // Manifest URL request status has been updated
        case FetchFileManifestUrlSuccessAction.ACTION_TYPE:
            return state.fetchFileManifestUrlSuccess(action as FetchFileManifestUrlSuccessAction);
            
        case ClearManifestDownloadFileSummaryAction.ACTION_TYPE:
            return FileManifestState.getDefaultState();

        default:
            return state;
    }
}
