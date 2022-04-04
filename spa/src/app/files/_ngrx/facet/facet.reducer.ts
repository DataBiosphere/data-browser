/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Facets reducer: handles actions related to setting and clearing fileFacets.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { InitEntityStateAction } from "../entity/init-entity-state.action";
import { FacetState } from "./facet.state";
import { FetchFacetsSuccessAction } from "./fetch-facets-success-action.action";
import { SelectFileFacetTermAction } from "../search/select-file-facet-term.action";
import { ClearSelectedTermsAction } from "../search/clear-selected-terms.action";
import { SetViewStateAction } from "./set-view-state.action";
import { SelectFacetAgeRangeAction } from "../search/select-facet-age-range.action";
import { ClearSelectedAgeRangeAction } from "../search/clear-selected-age-range.action";

/**
 * @param state {FacetState}
 * @param action {Action}
 * @returns {FacetState}
 */
export function reducer(
    state: FacetState = FacetState.getDefaultState(),
    action: Action
): FacetState {
    switch (action.type) {
        // Clear age range
        case ClearSelectedAgeRangeAction.ACTION_TYPE:
            return state.clearAgeRange(action as ClearSelectedAgeRangeAction);

        // Clear all search terms
        case ClearSelectedTermsAction.ACTION_TYPE:
            return FacetState.getDefaultState();

        // Handle cases where facet list has been re/requested and updated list of facets have been returned from end
        // point.
        case FetchFacetsSuccessAction.ACTION_TYPE:
            return state.receiveFileFacets(action as FetchFacetsSuccessAction);

        // Set up data for selected entity (eg projects, samples, files)
        case InitEntityStateAction.ACTION_TYPE:
            return state.requestFileFacets();

        // Handle case where age range has been specified
        case SelectFacetAgeRangeAction.ACTION_TYPE:
            return state.setAgeRange(action as SelectFacetAgeRangeAction);

        // Handle case where term has been selected - selected/deselected state of term must be updated, and possibly
        // the selected facet itself (if user has switched from the previously selected facet, to select a new term).
        case SelectFileFacetTermAction.ACTION_TYPE:
            return state.selectTerm(action as SelectFileFacetTermAction);

        // Handle the case where the view state has been parsed from URL param on app init - must do this here to set
        // the initial set of selected facet terms.
        case SetViewStateAction.ACTION_TYPE:
            return state.setSelectedFacetTermsFromViewState(
                action as SetViewStateAction
            );

        default:
            return state;
    }
}
