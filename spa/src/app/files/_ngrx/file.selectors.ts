/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Selectors for querying file-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { FileSummaryState } from "./file-summary/file-summary.state";
import { FileFacetListState } from "./file-facet-list/file-facet-list.state";
import { FileFacetMetadataSummaryState } from "./file-facet-metadata-summary/file-facet-metadata-summary.state";
import { TableState } from "./table/table.state";

export const selectFileFacets = createFeatureSelector<FileFacetListState>("fileFacetList");
export const selectSelectedFileFacets = createSelector(selectFileFacets, (state) => state.selectedFileFacets);
export const selectSelectedFacetsMap = createSelector(selectFileFacets, (state) => state.selectedFileFacetsByName);

/**
 * Return the list of file facets from the store.
 * @type {MemoizedSelector<object, FileFacet[]>}
 */
export const selectFileFacetsFileFacets = createSelector(selectFileFacets, (state) => {
    return state.fileFacets;
});

export const selectFileSummary = createFeatureSelector<FileSummaryState>("fileSummary");
export const selectFileFacetMetadataSummary = createFeatureSelector<FileFacetMetadataSummaryState>("fileFacetMetadataSummary");
export const selectTableState = createFeatureSelector<TableState>("tableState");

/**
 * Returns current state of pagination, of file facet table.
 * 
 * @type {MemoizedSelector<object, PaginationModel>}
 */
export const selectPagination = createSelector(selectTableState,(tableState: TableState) => {
    return tableState.tableModel.pagination;
});

export const selectTableData = createSelector(
    selectTableState,
    (tableState: TableState) => {
        return tableState.tableModel.data;
    });


export const selectTableQueryParams = createSelector(selectSelectedFacetsMap, selectPagination, (selectedFacets, pagination) => {
    return { selectedFacets, pagination };
});



