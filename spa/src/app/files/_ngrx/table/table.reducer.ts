/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table reducer, handles actions related to table data and pagination.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ClearSelectedProjectAction } from "./clear-selected-project.action";
import { SelectEntityAction } from "../entity/select-entity.action";
import { ClearEntitiesAction } from "../entity/clear-entities.action";
import { FetchFacetsSuccessAction } from "../facet/fetch-facets-success-action.action";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { FetchTableModelSuccessAction } from "./fetch-table-model-success.action";
import { FetchTableDataSuccessAction } from "./fetch-table-data-success.action";
import * as tableStateService from "./table.state";
import { getDefaultTableState, TableState } from "./table.state";
import { FetchProjectSuccessAction } from "./table.actions";
import { TableModel } from "../../table/table.model";
import { TermCountsUpdatedAction } from "./term-counts-updated.action";
import { TableNextPageSuccessAction } from "./table-next-page-success.action";
import { TablePreviousPageSuccessAction } from "./table-previous-page-success.action";

export function reducer(
    state: TableState = tableStateService.getDefaultTableState(),
    action: Action
): TableState {
    let tableModel: TableModel;
    let nextState: TableState;
    let termCountsByFacetName;

    switch (action.type) {
        // User is switching tab, update selected entity.
        case SelectEntityAction.ACTION_TYPE:
            nextState = {
                ...state,
                selectedEntity: (action as SelectEntityAction).entityKey,
            };

            return nextState;

        // On fetch success of file facets, reset the table models of all entities except the current selected entity
        case FetchFacetsSuccessAction.ACTION_TYPE:
            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels:
                    tableStateService.clearUnselectedTableModels(state),
            };

            return nextState;

        // Project has been selected from the table and corresponding details have been successfully requested from
        // the server
        case FetchProjectSuccessAction.ACTION_TYPE:
            return {
                ...state,
                selectedProject: (action as FetchProjectSuccessAction).project,
            };

        // Clear the current selected project
        case ClearSelectedProjectAction.ACTION_TYPE:
            return {
                ...state,
                selectedProject: null,
            };

        // Table data has been retrieved from server - update data and pagination (but leave term counts unchanged).
        case FetchTableDataSuccessAction.ACTION_TYPE:
            const data = (action as FetchTableDataSuccessAction).data;
            const pagination = {
                ...(action as FetchTableDataSuccessAction).pagination,
                current_page: 1,
            };
            termCountsByFacetName = (action as FetchTableDataSuccessAction)
                .termCountsByFacetName;

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.updateSelectedTableModelData(
                    state,
                    data,
                    pagination,
                    termCountsByFacetName
                ),
            };

            return nextState;

        // Table model has been retrieved from server - update data, pagination and term counts.
        case FetchTableModelSuccessAction.ACTION_TYPE:
            tableModel = (action as FetchTableModelSuccessAction).tableModel;
            const updatedTableModel = {
                ...tableModel,
                pagination: {
                    ...tableModel.pagination,
                    current_page: 1,
                },
            };

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.updateSelectedTableModel(
                    state,
                    updatedTableModel
                ),
            };

            return nextState;

        // User's authenticated status has changed, clear cached table data.
        case ClearEntitiesAction.ACTION_TYPE:
            return getDefaultTableState();

        // View state has been parsed from URL param on app init - must do this to set the current selected tab.
        case SetViewStateAction.ACTION_TYPE:
            const setViewStateAction = action as SetViewStateAction;
            return {
                ...state,
                selectedEntity: setViewStateAction.selectedEntity,
            };

        // Paginate to next page using the specified table model, update table data and pagination but not term counts.
        case TableNextPageSuccessAction.ACTION_TYPE:
            tableModel = (action as TableNextPageSuccessAction).tableModel;
            const nextPagination = {
                ...tableModel.pagination,
                current_page:
                    tableStateService.getSelectedTable(state).pagination
                        .current_page + 1,
            };

            termCountsByFacetName =
                tableStateService.getSelectedTable(state).termCountsByFacetName;

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.updateSelectedTableModelData(
                    state,
                    tableModel.data,
                    nextPagination,
                    termCountsByFacetName
                ),
            };

            return nextState;

        // Paginate to previous page using the specified table model, update table data and pagination but not term counts.
        case TablePreviousPageSuccessAction.ACTION_TYPE:
            tableModel = (action as TablePreviousPageSuccessAction).tableModel;
            const previousPagination = {
                ...tableModel.pagination,
                current_page:
                    tableStateService.getSelectedTable(state).pagination
                        .current_page - 1,
            };

            termCountsByFacetName =
                tableStateService.getSelectedTable(state).termCountsByFacetName;

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.updateSelectedTableModelData(
                    state,
                    tableModel.data,
                    previousPagination,
                    termCountsByFacetName
                ),
            };

            return nextState;

        // Handle case where only the term counts need to be updated (and not the table data, pagination etc). This
        // can occur when selecting a project on the projects tab.
        case TermCountsUpdatedAction.ACTION_TYPE:
            termCountsByFacetName = (action as TermCountsUpdatedAction)
                .termCountsByFacetName;
            return {
                ...state,
                tableModels: tableStateService.updateSelectedTableTermCounts(
                    state,
                    termCountsByFacetName
                ),
            };

        default:
            return state;
    }
}
