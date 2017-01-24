// Core dependencies
import { ActionReducer } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/withLatestFrom";
import * as _ from "lodash";

// App dependencies
import * as fromFacets from "./file-facets/file-facets.reducer";
import { FileFacetsState } from "./file-facets/file-facet-state.model";
import * as fromSummary from "./file-summary/file-summary.reducer";
import { FileManifestSummary } from "./file-manifest-summary/file-manifest-summary";
import * as fromManifestSummary from "./file-manifest-summary/file-manifest-summary.reducer";
import { FileFacetMetadataSummary } from "./file-facet-metadata-summary/file-facet-metadata-summary.model";
import * as fromFileFacetMetadataSummary from "./file-facet-metadata-summary/file-facet-metadata-summary.reducer";
import { Dictionary } from "../shared/dictionary";
import { FileFacet } from "./shared/file-facet.model";
import { Selector } from "../shared/selector";


export interface FilesState {
    fileSummary: fromSummary.FileSummaryState;
    fileFacets: FileFacetsState;
    fileManifestSummary: fromManifestSummary.State;
    fileFacetMetadataSummary: FileFacetMetadataSummary;
}

export const reducers: Dictionary<ActionReducer<any>> = {
    fileSummary: fromSummary.reducer,
    fileFacets: fromFacets.reducer,
    fileManifestSummary: fromManifestSummary.reducer,
    fileFacetMetadataSummary: fromFileFacetMetadataSummary.reducer
};

/**
 * File Summary Selectors
 */

export const selectFileSummary = compose(fromSummary.selectFileSummary, selectFileSummaryState);

export const selectFileSummaryLoading = compose(fromSummary.selectFileSummaryLoading, selectFileSummaryState);

function selectFileSummaryState(appState$: Observable<FilesState>): Observable<fromSummary.FileSummaryState> {
    return appState$.select(appState => appState.fileSummary);
}

/**
 * File Facet Selectors
 */
export function selectFileFacetState(appState$: Observable<FilesState>): Observable<FileFacetsState> {
    return appState$.select((appState) => {
        return appState.fileFacets;
    });
}

export const selectFileFacetsLoading = compose(fromFacets.selectLoading, selectFileFacetState);

export function selectSelectedFacetsMap(appState$: Observable<FilesState>): Observable<Map<string, FileFacet>> {
    return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
            return fileFacetState.selectedFileFacesByName;
        }
    );
}

export function selectFileFacets(appState$: Observable<FilesState>): Observable<FileFacet[]> {
    return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {

            if ( fileFacetState.selectedFacet ) {
                return fileFacetState.fileFacets.map((fileFacet) => {
                    if ( fileFacet.name === fileFacetState.selectedFacet.name ) {
                        return fileFacetState.selectedFacet;
                    }else {
                        return fileFacet;
                    }
                });

            }else{
                return fileFacetState.fileFacets;
            }
        }
    );
}

/**
 * Returns the file facet with the specified name.
 *
 * @param appState$ {Observable<FilesState>}
 * @param fileFacetName {string}
 * @returns Observable<FileFacet[]>
 */
export function selectFileFacetByName(appState$: Observable<FilesState>, fileFacetName: string): Observable<FileFacet> {

    return selectFileFacetState(appState$)
        .map((fileFacetState: FileFacetsState) => {

            return _.find(fileFacetState.fileFacets, (fileFacet: FileFacet) => {
                return fileFacet.name === fileFacetName;
            });
        });
}

export function selectSelectedFileFacets(appState$: Observable<FilesState>): Observable<FileFacet[]> {
    return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
            return fileFacetState.selectedFileFacets;
        }
    );
}

/**
 * File Manifest Summary Selectors
 */
export function selectManifestSummary(appState$: Observable<FilesState>): Observable<fromManifestSummary.State> {
    return appState$.select(appState => appState.fileManifestSummary);
}


export const selectManifestSummaryLoading: Selector<boolean> = compose(fromManifestSummary.selectLoading, selectManifestSummary);

export const selectRepositoryManifestSummaries: Selector<FileManifestSummary[]> =
    compose(fromManifestSummary.selectRepositoryManifestSummaries, selectManifestSummary);

/**
 * File Facet Metadata Summary Selectors
 */
export function selectFileFacetMetadataSummary(appState$: Observable<FilesState>): Observable<FileFacetMetadataSummary> {
    return appState$.select(appState => appState.fileFacetMetadataSummary);
}

export const selectFileFacetMetadataSummaryLoading: Selector<boolean> =
    compose(fromFileFacetMetadataSummary.selectLoading, selectFileFacetMetadataSummary);

export const selectFileFacetsSortOrder: Selector<string[]> =
    compose(fromFileFacetMetadataSummary.selectSortOrder, selectFileFacetMetadataSummary);
