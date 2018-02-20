import {
    FetchFileFacetMetadataSummarySuccessAction
} from "./file-facet-metadata-summary.actions";
import { Action } from "@ngrx/store";
import { FileFacetMetadataSummaryState } from "./file-facet-metadata-summary.state";

export function reducer(state: FileFacetMetadataSummaryState = FileFacetMetadataSummaryState.getDefaultState(), action: Action) {

    switch (action.type) {
        case FetchFileFacetMetadataSummarySuccessAction.ACTION_TYPE:
            return state.receiveMetadataSummary(action as FetchFileFacetMetadataSummarySuccessAction);
        default:
            return state;
    }
}
