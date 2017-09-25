import {
    DownloadFileManifestAction,
    FetchFileManifestSummaryRequestAction, FetchFileManifestSummarySuccessAction
} from "./file-manifest-summary.actions";
import { FileManifestSummaryState } from "./file-manifest-summary.state";
import { Action } from "@ngrx/store";

export function reducer(state: FileManifestSummaryState = FileManifestSummaryState.getDefaultState(), action: Action): FileManifestSummaryState {

    switch (action.type) {

        case FetchFileManifestSummaryRequestAction.ACTION_TYPE:
            return state.requestManifestSummary();
        case FetchFileManifestSummarySuccessAction.ACTION_TYPE:
            return state.receiveManifestSummary(action as FetchFileManifestSummarySuccessAction);
        case DownloadFileManifestAction.ACTION_TYPE:
            return FileManifestSummaryState.getDefaultState();
        default:
            return state;
    }
}
