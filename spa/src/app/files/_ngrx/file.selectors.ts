import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FileSummaryState } from "./file-summary/file-summary.state";
import { FileFacetListState } from "./file-facet-list/file-facet-list.state";
import { FileFacetMetadataSummaryState } from "./file-facet-metadata-summary/file-facet-metadata-summary.state";
import { TableState } from "./table/table.state";

export const selectFileFacets = createFeatureSelector<FileFacetListState>("fileFacetList");
export const selectSelectedFileFacets = createSelector(selectFileFacets, (state) => state.selectedFileFacets);
export const selectSelectedFacetsMap = createSelector(selectFileFacets, (state) => state.selectedFileFacesByName);
export const selectFileFacetsFileFacets = createSelector(selectFileFacets, (state) => {

    if (state.selectedFacet) {
        return state.fileFacets.map((fileFacet) => {
            if (fileFacet.name === state.selectedFacet.name) {
                return state.selectedFacet;
            }
            else {
                return fileFacet;
            }
        });

    }
    else {
        return state.fileFacets;
    }
});

export const selectFileSummary = createFeatureSelector<FileSummaryState>("fileSummary");
export const selectFileFacetMetadataSummary = createFeatureSelector<FileFacetMetadataSummaryState>("fileFacetMetadataSummary");
export const selectTableState = createFeatureSelector<TableState>("tableState");

export const selectPagination = createSelector(
    selectTableState,
    (tableState: TableState) => {
    return tableState.tableModel.pagination;
});

export const selectTableQueryParams = createSelector(selectSelectedFacetsMap, selectPagination, (selectedFacets, pagination) => {
    return { selectedFacets, pagination };
});



