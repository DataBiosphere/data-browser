/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Reducer handling unfaceted file summary-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import {
    FetchUnfacetedFileSummaryRequestAction,
    UnfacetedFetchFileSummarySuccessAction
} from "./file-summary.actions";
import { FileSummaryState } from "./file-summary.state";

export function reducer(state: FileSummaryState = FileSummaryState.getDefaultState(), action: Action): FileSummaryState {

    switch (action.type) {

        case FetchUnfacetedFileSummaryRequestAction.ACTION_TYPE:
            return state.fetchSummaryRequest();

        case UnfacetedFetchFileSummarySuccessAction.ACTION_TYPE:
            return state.fetchSummarySuccess(action as UnfacetedFetchFileSummarySuccessAction);

        default:
            return state;
    }
}
