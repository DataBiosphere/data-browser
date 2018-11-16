/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Reducer handling file summary-related actions when displaying the manifest download modal.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import {
    FetchManifestDownloadFileSummaryRequestAction,
    FetchManifestDownloadFileSummarySuccessAction
} from "./file-summary.actions";
import { FileSummaryState } from "./file-summary.state";

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
