/**
 * File Summary Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
import { Action } from "@ngrx/store";
import { FileFacetListState } from "./file-facet-list.state";
import {
    ClearSelectedFileFacetsAction,
    FetchFileFacetsSuccessAction, FetchFileFacetsRequestAction,
    SelectFileFacetAction
} from "./file-facet-list.actions";

export function reducer(state: FileFacetListState = FileFacetListState.getDefaultState(), action: Action): FileFacetListState {

    switch (action.type) {
        case FetchFileFacetsRequestAction.ACTION_TYPE:
            return state.requestFileFacets();
        case SelectFileFacetAction.ACTION_TYPE:
            return state.selectTerm(action as SelectFileFacetAction);
        case FetchFileFacetsSuccessAction.ACTION_TYPE:
            return state.receiveFileFacets(action as FetchFileFacetsSuccessAction);
        case ClearSelectedFileFacetsAction.ACTION_TYPE:
            return state.clearSelectedFacet();
        default:
            return state;
    }
}
