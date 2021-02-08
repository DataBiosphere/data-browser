/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling export to catalog-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { CatalogState } from "./catalog.state";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { FetchCatalogsErrorAction } from "./fetch-catalogs-error.action";
import { FetchCatalogsSuccessAction } from "./fetch-catalogs-success.action";
import { SelectCatalogAction } from "./select-catalog.action";

export function reducer(state: CatalogState = CatalogState.getDefaultState(), action: Action): CatalogState {

    switch (action.type) {

        // Handle response from catalogs endpoint
        case FetchCatalogsSuccessAction.ACTION_TYPE:
            return state.fetchCatalogsSuccess((action as FetchCatalogsSuccessAction));

        // Handle error during request for catalogs
        case FetchCatalogsErrorAction.ACTION_TYPE:
            return state.fetchCatalogsError((action as FetchCatalogsErrorAction));

        // Handle select of catalog - dev environments only
        case SelectCatalogAction.ACTION_TYPE:
            return state.setCatalog((action as SelectCatalogAction).catalog);

        // View state has been parsed from URL param on app init
        case SetViewStateAction.ACTION_TYPE:
            return state.setCatalog((action as SetViewStateAction).catalog);

        default:
            return state;
    }
}
