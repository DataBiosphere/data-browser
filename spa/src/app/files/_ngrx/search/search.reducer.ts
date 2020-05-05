/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Search reducer, handles actions related to selecting and deselecting file facet terms and entities.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SearchState } from "./search.state";
import { SelectFileFacetTermAction } from "./select-file-facet-term.action";
import { ClearSelectedTermsAction } from "./clear-selected-terms.action";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { SearchTermsUpdatedAction } from "./search-terms-updated-action.action";
import { SelectProjectIdAction } from "./select-project-id.action";
import { SelectFacetAgeRangeAction } from "./select-facet-age-range.action";
import { SelectSearchTermAction } from "./select-search-term.action";
import { ClearSelectedAgeRangeAction } from "./clear-selected-age-range.action";

/**
 * @param state {SearchState}
 * @param action {Action}
 * @returns {SearchState}
 */
export function reducer(state: SearchState = SearchState.getDefaultState(), action: Action): SearchState {

    switch (action.type) {

        // Age range has been cleared
        case ClearSelectedAgeRangeAction.ACTION_TYPE:
            return state.clearAgeRange(action as ClearSelectedAgeRangeAction);

        // Clear all search terms
        case ClearSelectedTermsAction.ACTION_TYPE:
            return SearchState.getDefaultState();
            
        // Term or project has been selected/deselected
        case SelectFileFacetTermAction.ACTION_TYPE:
        case SelectProjectIdAction.ACTION_TYPE:
            return state.selectSearchTerm(action as any);

        // Age range has been selected
        case SelectFacetAgeRangeAction.ACTION_TYPE:
            return state.selectAgeRange(action as SelectFacetAgeRangeAction);
            
        // Set of possible search terms to select from has been updated
        case SearchTermsUpdatedAction.ACTION_TYPE:
            return state.setSearchTerms(action as SearchTermsUpdatedAction);

        // View state has been parsed from URL param on app init - must do this here to set the initial set of search
        // terms.
        case SetViewStateAction.ACTION_TYPE:
            return state.setSelectedSearchTermsFromViewState(action as SetViewStateAction);

        default:
            return state;
    }
}
