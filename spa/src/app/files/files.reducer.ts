// Core dependencies
import { ActionReducer, createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import * as fromFacets from "./file-facets/file-facets.reducer";
import { FileFacetsState } from "./file-facets/file-facet-state.model";
import * as fromSummary from "./file-summary/file-summary.reducer";
import * as fromManifestSummary from "./file-manifest-summary/file-manifest-summary.reducer";
import { FileFacetMetadataSummaryState } from "./file-facet-metadata-summary/file-facet-metadata-summary.model";
import * as fromFileFacetMetadataSummary from "./file-facet-metadata-summary/file-facet-metadata-summary.reducer";
import { Dictionary } from "../shared/dictionary";
// import { FileFacet } from "./shared/file-facet.model";
// import { Selector } from "../shared/selector";


export interface FilesState {
    fileSummary: fromSummary.FileSummaryState;
    fileFacets: FileFacetsState;
    fileManifestSummary: fromManifestSummary.State;
    fileFacetMetadataSummary: FileFacetMetadataSummaryState;
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

// export const selectFileSummary = compose(fromSummary.selectFileSummary, selectFileSummaryState);

// export const selectFileSummaryLoading = compose(fromSummary.selectFileSummaryLoading, selectFileSummaryState);

// function selectFileSummaryState(appState$: Observable<FilesState>): Observable<fromSummary.FileSummaryState> {
//     return appState$.map(appState => appState.fileSummary);
// }

// /**
//  * File Facet Selectors
//  */
// export function selectFileFacetState(appState$: Observable<FilesState>): Observable<FileFacetsState> {
//     return appState$.map((appState) => {
//         return appState.fileFacets;
//     });
// }

// export const selectFileFacetsLoading = compose(fromFacets.selectLoading, selectFileFacetState);

// export function selectSelectedFacetsMap(appState$: Observable<FilesState>): Observable<Map<string, FileFacet>> {
//     return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
//             return fileFacetState.selectedFileFacesByName;
//         }
//     );
// }

// export function selectFileFacets(appState$: Observable<FilesState>): Observable<FileFacet[]> {
//     return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
//
//             // dont replace the seleced facet out from under the menu.
//             // he is covered so you cant see that he still has the old state.
//             if ( fileFacetState.selectedFacet ) {
//                 return fileFacetState.fileFacets.map((fileFacet) => {
//                     if ( fileFacet.name === fileFacetState.selectedFacet.name ) {
//                         return fileFacetState.selectedFacet;
//                     }else {
//                         return fileFacet;
//                     }
//                 });
//
//             } else {
//                 return fileFacetState.fileFacets;
//             }
//         }
//     );
// }

// /**
//  * Returns the file facet with the specified name.
//  *
//  * @param appState$ {Observable<FilesState>}
//  * @param fileFacetName {string}
//  * @returns Observable<FileFacet[]>
//  */
// export function selectFileFacetByName(appState$: Observable<FilesState>, fileFacetName: string): Observable<FileFacet> {
//
//     return selectFileFacetState(appState$)
//         .map((fileFacetState: FileFacetsState) => {
//
//             return _.find(fileFacetState.fileFacets, (fileFacet: FileFacet) => {
//                 return fileFacet.name === fileFacetName;
//             });
//         });
// }

// export function selectSelectedFileFacets(appState$: Observable<FilesState>): Observable<FileFacet[]> {
//     return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
//             return fileFacetState.selectedFileFacets;
//         }
//     );
// }

/**
 * File Manifest Summary Selectors
 */
// export function selectManifestSummary(appState$: Observable<FilesState>): Observable<fromManifestSummary.State> {
//     return appState$.map(appState => appState.fileManifestSummary);
// }


// export const selectManifestSummaryLoading: Selector<boolean> = compose(fromManifestSummary.selectLoading, selectManifestSummary);
//
// export const selectRepositoryManifestSummaries: Selector<FileManifestSummary[]> =
//     compose(fromManifestSummary.selectRepositoryManifestSummaries, selectManifestSummary);

/**
 * File Facet Metadata Summary Selectors
 */
// export function selectFileFacetMetadataSummary(appState$: Observable<FilesState>): Observable<FileFacetMetadataSummaryState> {
//     return appState$.map(appState => appState.fileFacetMetadataSummary);
// }

// export const selectFileFacetMetadataSummaryLoading: Selector<boolean> =
//     compose(fromFileFacetMetadataSummary.selectLoading, selectFileFacetMetadataSummary);

// export const selectFileFacetsSortOrder: Selector<string[]> =
//     compose(fromFileFacetMetadataSummary.selectSortOrder, selectFileFacetMetadataSummary);


export const selectFileFacets = createFeatureSelector<FileFacetsState>("fileFacets");
export const selectSelectedFileFacets = createSelector(selectFileFacets, (state) => state.selectedFileFacets);
export const selectSelectedFacetsMap = createSelector(selectFileFacets, (state) => state.selectedFileFacesByName);
export const selectFileFacetsFileFacets = createSelector(selectFileFacets, (state) => {

    if ( state.selectedFacet ) {
        return state.fileFacets.map((fileFacet) => {
            if ( fileFacet.name === state.selectedFacet.name ) {
                return state.selectedFacet;
            }else {
                return fileFacet;
            }
        });

    } else {
        return state.fileFacets;
    }
});

// export const selectFileFacetByName = (facetName: string): MemoizedSelector<any, FileFacet[]> => createSelector(selectFileFacetsA, (state) => {
//     return _.find(state.fileFacets, (fileFacet: FileFacet) => fileFacet.name === facetName);
// });

export const selectFileSummary = createFeatureSelector<fromSummary.FileSummaryState>("fileSummary");
export const selectFileSummarySummary = createSelector(selectFileSummary, (state) => state.summary);
// export const selectFileManifestSummary = createFeatureSelector<fromManifestSummary.State>("fileManifestSummary");

export const selectFileFacetMetadataSummary = createFeatureSelector<FileFacetMetadataSummaryState>("fileFacetMetadataSummary");
