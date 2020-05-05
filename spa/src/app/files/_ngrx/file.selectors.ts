/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying file-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { FileSummaryState } from "./file-summary/file-summary.state";
import { selectSelectedSearchTermsBySearchKey } from "./search/search.selectors";
import { getSelectedEntity, getSelectedTable, TableState } from "./table/table.state";
import { PaginationModel } from "../table/pagination.model";
import { selectFacetFacets } from "./facet/facet.selectors";

/**
 * Return the file summary from the store.
 */
export const selectFileSummary = createFeatureSelector<FileSummaryState>("fileSummary");

/**
 * Table selectors
 */

/**
 * Returns complete table state, including state that has been cached for the current selected entity, and any previously
 * selected entities.
 *
 * @returns {TableState}
 */
export const selectTableState = createFeatureSelector<TableState>("tableState");

/**
 * For the current selected entity, return the term counts for each facet, keyed by facet name.
 *
 * @returns {Map<string, number>}
 */
export const selectTermCountsByFacetName =
    createSelector(selectTableState, (tableState) => getSelectedTable(tableState).termCountsByFacetName);

/**
 * Returns current state of loading of file facet table.
 *
 * @returns {boolean}
 */
export const selectTableLoading = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedTable(tableState).loading;
});

/**
 * Returns pagination state of the current selected entity.
 *
 * @returns {PaginationModel}
 */
export const selectPagination = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedTable(tableState).pagination;
});

/**
 * Returns data used to populate the table of the current selected entity.
 *
 * @returns {any}
 */
export const selectTableData = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedTable(tableState).data;
});

/**
 * Returns set of entity specs in the system.
 *
 * @returns {EntitySpec[]}
 */
export const selectEntities = createSelector(selectTableState, (tableState: TableState) => {
    return tableState.entitySpecs;
});

/**
 * Returns current selected entity spec.
 *
 * @returns {EntitySpec}
 */
export const selectSelectedEntity = createSelector(selectTableState, (tableState: TableState) => {
    return getSelectedEntity(tableState);
});

/**
 * Returns a combination of selected entity facets, the current pagination state and the over all table state.
 *
 * @returns {Map<string, FileFacet> & PaginationModel & TableState}
 */
export const selectTableQueryParams = createSelector(
    selectSelectedSearchTermsBySearchKey,
    selectPagination,
    selectTableState,
    (selectedSearchTermsBySearchKey, pagination, tableState) => {
        return {selectedSearchTermsBySearchKey, pagination, tableState};
    });

/**
 * Return the selected entry (ie the selected row in the table).
 */
export const selectSelectedProject = createSelector(selectTableState, (tableState: TableState) => {

    return tableState.selectedProject;
});
