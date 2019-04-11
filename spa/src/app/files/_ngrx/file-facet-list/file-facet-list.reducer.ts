/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File facet list reducer, handles actions related to setting and updating file facets.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileFacetListState } from "./file-facet-list.state";
import {
    ClearSelectedFileFacetsAction,
    FetchFileFacetsSuccessAction,
    InitEntityStateAction
} from "./file-facet-list.actions";
import { SelectFileFacetTermAction } from "../search/select-file-facet-term.action";
import { SelectProjectAction } from "../search/select-project.action";
import { ClearSelectedTermsAction } from "../search/clear-selected-terms.action";
import { SetViewStateAction } from "./set-view-state.action";

/**
 * @param state {FileFacetListState}
 * @param action {Action}
 * @returns {FileFacetListState}
 */
export function reducer(state: FileFacetListState = FileFacetListState.getDefaultState(), action: Action): FileFacetListState {

    switch (action.type) {

        case InitEntityStateAction.ACTION_TYPE:
            return state.requestFileFacets();

        // Handle case where term has been selected - selected/deselected state of term must be updated, and possibly
        // the selected facet itself (if user has switched from the previously selected facet, to select a new term).
        case SelectFileFacetTermAction.ACTION_TYPE:
            return state.selectTerm(action as SelectFileFacetTermAction);

        // Handle case where project has been selected - selected/deselected state of term must be updated, and possibly
        // the selected facet itself (if user has switched from the previously selected facet, to select a new term).
        case SelectProjectAction.ACTION_TYPE:
            return state.selectTerm(action as SelectProjectAction);

        // Handle cases where facet list has been re/requested and updated list of facets have been returned from end
        // point.
        case FetchFileFacetsSuccessAction.ACTION_TYPE:
            return state.receiveFileFacets(action as FetchFileFacetsSuccessAction);

        case ClearSelectedFileFacetsAction.ACTION_TYPE:
            return state.clearSelectedFacet();

        case ClearSelectedTermsAction.ACTION_TYPE:
            return FileFacetListState.getDefaultState();

        // Handle the case where the view state has been parsed from URL param on app init - must do this here to set
        // the initial set of selected facet terms.
        case SetViewStateAction.ACTION_TYPE:

            return state.setSelectedFacetTermsFromViewState(action as SetViewStateAction);

        default:
            return state;
    }
}
