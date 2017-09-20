/**
 * Facet Summary Metadata Reducer
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { ACTIONS } from "../../shared/boardwalk.actions";

import { FileFacetMetadataSummaryState } from "./file-facet-metadata-summary.model";
import { FileFacetMetadata } from "../file-facet-metadata/file-facet-metadata.model";

const DEFAULT_STATE = new FileFacetMetadataSummaryState([], true);

interface BwAction extends Action {
    payload: any;
}

/**
 * File Facets Reducer
 */
export const reducer: ActionReducer<FileFacetMetadataSummaryState> = (facetMetadataSummaryState: FileFacetMetadataSummaryState = DEFAULT_STATE,
                                                                      action: BwAction) => {

    switch (action.type) {
        case ACTIONS.FILE_FACET_METADATA_SUMMARY_REQUESTED:
            return facetMetadataSummaryState.setLoading(true);
        case ACTIONS.FILE_FACET_METADATA_SUMMARY_RECEIVED:
            return facetMetadataSummaryState.setFacetMetadataSummary(action.payload);
        default:
            return facetMetadataSummaryState;
    }
};

/**
 * SELECTORS
 */
export const selectLoading = (facetMetadataSummaryState$: Observable<FileFacetMetadataSummaryState>) => {
    return facetMetadataSummaryState$.map(facetMetadataSummaryState => facetMetadataSummaryState.loading);
};

export const selectSortOrder = (facetMetadataSummaryState$: Observable<FileFacetMetadataSummaryState>) => {
    return facetMetadataSummaryState$.map(facetMetadataSummaryState => facetMetadataSummaryState.sortOrder);
};

export const selectFacetMetadata = (facetMetadataSummaryState$: Observable<FileFacetMetadataSummaryState>): Observable<FileFacetMetadata[]> => {
    return facetMetadataSummaryState$.map(fileFacetState => fileFacetState.facetMetadata);
};
