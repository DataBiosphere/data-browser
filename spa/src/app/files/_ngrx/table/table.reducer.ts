/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Table reducer, handles actions related to table data and pagination.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import {
    FetchFileFacetsSuccessAction,
    SetViewStateAction
} from "../file-facet-list/file-facet-list.actions";
import * as tableStateService from "./table.state";
import { TableState } from "./table.state";
import {
    EntitySelectAction, FetchProjectRequestAction,
    FetchTableDataSuccessAction,
    TableNextPageSuccessAction,
    TablePreviousPageSuccessAction, FetchProjectSuccessAction
} from "./table.actions";
import { TableModel } from "../../table/table.model";

export function reducer(state: TableState = tableStateService.getDefaultTableState(), action: Action): TableState {

    let tableModel: TableModel;
    let nextState: TableState;

    switch (action.type) {

        case FetchTableDataSuccessAction.ACTION_TYPE:

            tableModel = (action as FetchTableDataSuccessAction).tableModel;
            tableModel.pagination.current_page = 1;

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.updateSelectedTableModel(state, tableModel)
            };

            return nextState;


        case TableNextPageSuccessAction.ACTION_TYPE:

            tableModel = (action as TableNextPageSuccessAction).tableModel;
            tableModel.pagination.current_page = tableStateService.getSelectedTable(state).pagination.current_page + 1;

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.updateSelectedTableModel(state, tableModel)
            };

            return nextState;


        case TablePreviousPageSuccessAction.ACTION_TYPE:

            tableModel = (action as TablePreviousPageSuccessAction).tableModel;
            tableModel.pagination.current_page = tableStateService.getSelectedTable(state).pagination.current_page - 1;

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.updateSelectedTableModel(state, tableModel)
            };

            return nextState;

        case EntitySelectAction.ACTION_TYPE:

            nextState = {
                ...state, selectedEntity: (action as EntitySelectAction).key
            };

            return nextState;

        // Handle the case where the view state has been parsed from URL param on app init - must do this to set the
        // current selected tab.
        case SetViewStateAction.ACTION_TYPE:

            return {
                ...state,
                selectedEntity: (action as SetViewStateAction).selectedEntity
            };

        case FetchFileFacetsSuccessAction.ACTION_TYPE:

            nextState = {
                ...state,
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateService.clearUnSelectedTableModels(state)
            };

            return nextState;

        // Handle case where project has been selected from the table and corresponding details have been
        // successfully requested from the server
        case FetchProjectSuccessAction.ACTION_TYPE:

            return {
                ...state,
                selectedProject: (action as FetchProjectSuccessAction).project
            };

        default:

            return state;
    }
}
