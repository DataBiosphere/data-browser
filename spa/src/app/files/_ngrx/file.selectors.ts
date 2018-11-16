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
import { getSelectedEntity, getSelectedTable, TableState } from "./table/table.state";
import { FileFacet } from "../shared/file-facet.model";

// Return facet list-related slices.
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
export const selectDownloadManifestFileSummary = createFeatureSelector<FileSummaryState>("manifestDownloadFileSummary");

/**
 * Returns current state of pagination, of file facet table.
 *
 * @type {MemoizedSelector<object, PaginationModel>}
 */
export const selectPagination = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedTable(tableState).pagination;
});

export const selectTableData = createSelector(
    selectTableState,
    (tableState: TableState) => {
        return getSelectedTable(tableState).data;
    });

export const selectSelectedEntity = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedEntity(tableState);
});


export const selectTableQueryParams = createSelector(selectSelectedFacetsMap, selectPagination, selectTableState, (selectedFacets, pagination, tableState) => {
    return { selectedFacets, pagination, tableState };
});

export const selectEntities = createSelector(selectTableState, (tableState: TableState) => {
    return tableState.entitySpecs;
});

/**
 * Return the selected entry (ie the selected row in the table).
 */
export const selectSelectedProject = createSelector(selectTableState, (tableState: TableState) => {

    return tableState.selectedProject;
});

/*
 * Returns true if there are files of file type Matrix for the current set of selected facets, if any.
 */
export const selectFileTypeMatrix = createSelector(selectFileFacets, (fileFacetState) => {
    return fileFacetState.fileFacets.some(fileFacet => {
        return fileFacet.terms.some(term => {
            return term.name === "matrix" && term.count > 0;
        });
    });
});

/**
 * Return the selected view state - both the selected entity and the selected facets
 */
export const selectSelectedViewState = createSelector(selectSelectedFileFacets, selectSelectedEntity, (selectSelectedFileFacets, selectSelectedEntity) => {
    return {
        selectSelectedFileFacets,
        selectSelectedEntity
    };
});
