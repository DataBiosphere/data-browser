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
import { SelectProjectAction } from "./select-project.action";
import { ClearSelectedTermsAction } from "./clear-selected-terms.action";
import { SetViewStateAction } from "../file-facet-list/set-view-state.action";
import { SelectProjectIdAction } from "./select-project-id.action";

// App dependencies

/**
 * @param state {SearchState}
 * @param action {Action}
 * @returns {SearchState}
 */
export function reducer(state: SearchState = SearchState.getDefaultState(), action: Action): SearchState {

    switch (action.type) {

        // Handle case where term or project has been selected/deselected
        case SelectFileFacetTermAction.ACTION_TYPE:
        case SelectProjectAction.ACTION_TYPE:
        case SelectProjectIdAction.ACTION_TYPE:
            return state.selectSearchTerm(action as any);

        // Handle clear of search term or entity
        case ClearSelectedTermsAction.ACTION_TYPE:
            return SearchState.getDefaultState();

        // Handle the case where the view state has been parsed from URL param on app init - must do this here to set
        // the initial set of search terms.
        case SetViewStateAction.ACTION_TYPE:

            return state.setSelectedSearchTermsFromViewState(action as SetViewStateAction);

        default:
            return state;
    }
}
