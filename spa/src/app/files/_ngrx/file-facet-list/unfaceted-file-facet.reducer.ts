/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Reducer handling unfaceted file facets-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import {
    FetchUnfacetedFileFacetsRequestAction,
    FetchUnfacetedFileFacetsSuccessAction
} from "./file-facet-list.actions";
import { FileFacet } from "../../shared/file-facet.model";

export function reducer(state: FileFacet[] = [], action: Action): FileFacet[] {

    switch (action.type) {

        case FetchUnfacetedFileFacetsRequestAction.ACTION_TYPE:
            return [];

        case FetchUnfacetedFileFacetsSuccessAction.ACTION_TYPE:
            return [
                ...(action as FetchUnfacetedFileFacetsSuccessAction).fileFacets
            ];

        default:
            return state;
    }
}
