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
import { DownloadFileManifestRequestedAction } from "./download-file-manifest-requested.action";
import { FetchManifestDownloadFileSummaryRequestAction } from "./fetch-manifest-download-file-summary-request.action";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { FileManifestState } from "./file-manifest.state"

export function reducer(state: FileManifestState = FileManifestState.getDefaultState(), action: Action): FileManifestState {

    switch (action.type) {

        case FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE:
            return state.fetchSummaryRequest();

        case FetchManifestDownloadFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchSummarySuccess(action as FetchManifestDownloadFileSummarySuccessAction);

        // Download status has been updated
        case DownloadFileManifestRequestedAction.ACTION_TYPE:
            return state.downloadRequested(action as DownloadFileManifestRequestedAction);
            
        case ClearManifestDownloadFileSummaryAction.ACTION_TYPE:
            return FileManifestState.getDefaultState();

        default:
            return state;
    }
}
