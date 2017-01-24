/**
 * Facet Summary Metadata Reducer
 */
import { Action, ActionReducer } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import "@ngrx/core/add/operator/select";

import { ACTIONS } from "../../shared/boardwalk.actions";

import { FileFacetMetadataSummary } from "./file-facet-metadata-summary.model";
import { FileFacetMetadata } from "../file-facet-metadata/file-facet-metadata.model";

const DEFAULT_STATE = new FileFacetMetadataSummary([], true);

/**
 * File Facets Reducer
 */
export const reducer: ActionReducer<FileFacetMetadataSummary> = (facetMetadataSummaryState: FileFacetMetadataSummary = DEFAULT_STATE,
                                                                 action: Action) => {

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
export const selectLoading = (facetMetadataSummaryState$: Observable<FileFacetMetadataSummary>) => {
    return facetMetadataSummaryState$.select(facetMetadataSummaryState => facetMetadataSummaryState.loading);
};

export const selectSortOrder = (facetMetadataSummaryState$: Observable<FileFacetMetadataSummary>) => {
    return facetMetadataSummaryState$.select(facetMetadataSummaryState => facetMetadataSummaryState.sortOrder);
};

export const selectFacetMetadata = (facetMetadataSummaryState$: Observable<FileFacetMetadataSummary>): Observable<FileFacetMetadata[]> => {
    return facetMetadataSummaryState$.select(fileFacetState => fileFacetState.facetMetadata);
};
