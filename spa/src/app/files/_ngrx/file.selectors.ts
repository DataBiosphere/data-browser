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
import { MatrixState } from "./matrix/matrix.state";

// Return facet list-related slices.
export const selectFileFacets = createFeatureSelector<FileFacetListState>("fileFacetList");
export const selectSelectedFileFacets = createSelector(selectFileFacets, (state) => state.selectedFileFacets);
export const selectSelectedFileFacetsByName = createSelector(selectFileFacets, (state) => state.selectedFileFacetsByName);

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
 * Returns current state of loading of file facet table.
 *
 * @type {MemoizedSelector<Object, boolean>}
 */
export const selectTableLoading = createSelector(
    selectTableState,
    (tableState: TableState) => {
        return getSelectedTable(tableState).loading;
    });

/**
 * Returns current state of pagination of file facet table.
 * @type {MemoizedSelector<Object, PaginationModel>}
 */
export const selectPagination = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedTable(tableState).pagination;
});

export const selectTableData = createSelector(
    selectTableState,
    (tableState: TableState) => {
        return getSelectedTable(tableState).data;
    });

export const selectEntities = createSelector(selectTableState, (tableState: TableState) => {
    return tableState.entitySpecs;
});

export const selectSelectedEntity = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedEntity(tableState);
});

export const selectTableQueryParams = createSelector(selectSelectedFileFacetsByName, selectPagination, selectTableState,
    (selectedFileFacetsByName, pagination, tableState) => {
    return { selectedFileFacetsByName, pagination, tableState
    };
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
export const selectFileTypeMatrix = createSelector(selectFileSummary, (fileSummaryState: FileSummaryState) => {
    return fileSummaryState.fileTypeSummaries.some(fileTypeSummary => {
        return fileTypeSummary.fileType === "matrix" && fileTypeSummary.count > 0;
    });
});

/**
 * Returns the matrix-related slice of state.
 */
export const selectMatrix = createFeatureSelector<MatrixState>("matrix");

/**
 * Returns the set of possible file formats for the Matrix download
 */
export const selectMatrixFileFormats = createSelector(selectMatrix, (state) => state.fileFormats);

/**
 * Return the selected view state - both the selected entity and the selected facets
 */
export const selectSelectedViewState = createSelector(selectSelectedFileFacets, selectSelectedEntity, (selectSelectedFileFacets, selectSelectedEntity) => {
    return {
        selectSelectedFileFacets,
        selectSelectedEntity
    };
});
