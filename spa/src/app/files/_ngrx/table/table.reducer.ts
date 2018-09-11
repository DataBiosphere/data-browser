/**
 * Table Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
import { Action } from "@ngrx/store";
import * as tableStateFxns from "./table.state";
import {
    EntitySelectAction,
    FetchTableDataSuccessAction,
    TableNextPageSuccessAction,
    TablePreviousPageSuccessAction
} from "./table.actions";
import { TableModel } from "../../table/table.model";
import { FetchFileFacetsSuccessAction } from "../file-facet-list/file-facet-list.actions";
import { TableState } from "./table.state";

export function reducer(state: TableState = tableStateFxns.getDefaultTableState(), action: Action): TableState {


    let tableModel: TableModel;
    let nextState: TableState;

    switch (action.type) {

        case FetchTableDataSuccessAction.ACTION_TYPE:

            tableModel = (action as FetchTableDataSuccessAction).tableModel;
            tableModel.pagination.current_page = 1;

            nextState = {
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateFxns.updateSelectedTableModel(state, tableModel)
            };

            return nextState;


        case TableNextPageSuccessAction.ACTION_TYPE:

            tableModel = (action as TableNextPageSuccessAction).tableModel;
            tableModel.pagination.current_page = tableStateFxns.getSelectedTable(state).pagination.current_page + 1;

            nextState = {
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateFxns.updateSelectedTableModel(state, tableModel)
            };

            return nextState;


        case TablePreviousPageSuccessAction.ACTION_TYPE:

            tableModel = (action as TablePreviousPageSuccessAction).tableModel;
            tableModel.pagination.current_page = tableStateFxns.getSelectedTable(state).pagination.current_page - 1;

            nextState = {
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateFxns.updateSelectedTableModel(state, tableModel)
            };

            return nextState;

        case EntitySelectAction.ACTION_TYPE:

            nextState = {
                ...state, selectedEntity: (action as EntitySelectAction).key
            };

            return nextState;

        case FetchFileFacetsSuccessAction.ACTION_TYPE:

            nextState = {
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: tableStateFxns.clearUnSelectedTableModels(state)
            };

            return nextState;

        default:
            return state;
    }
}
