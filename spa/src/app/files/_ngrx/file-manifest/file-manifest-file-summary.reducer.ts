/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling file summary-related actions when displaying the manifest download modal.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FetchManifestDownloadFileSummaryRequestAction } from "./fetch-manifest-download-file-summary-request.action";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { FileSummaryState } from "../file-summary/file-summary.state";

export function reducer(state: FileSummaryState = FileSummaryState.getDefaultState(), action: Action): FileSummaryState {

    switch (action.type) {

        case FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE:
            return state.fetchSummaryRequest();

        case FetchManifestDownloadFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchSummarySuccess(action as FetchManifestDownloadFileSummarySuccessAction);

        default:
            return state;
    }
}
