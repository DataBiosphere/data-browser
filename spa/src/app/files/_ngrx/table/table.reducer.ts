/**
 * Table Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
import { Action } from "@ngrx/store";
import { getDefaultTableState, getSelectedTable, TableState, updateTableModels } from "./table.state";
import {
    EntitySelectAction,
    FetchTableDataSuccessAction,
    TableNextPageSuccessAction,
    TablePreviousPageSuccessAction
} from "./table.actions";
import { TableModel } from "../../table/table.model";

export function reducer(state: TableState = getDefaultTableState(), action: Action): TableState {


    let tableState: TableState;
    let tableModel: TableModel;

    switch (action.type) {

        case FetchTableDataSuccessAction.ACTION_TYPE:

            tableModel = (action as FetchTableDataSuccessAction).tableModel;
            tableModel.pagination.current_page = 1;

            return {
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: updateTableModels(state, tableModel)
            };


        case TableNextPageSuccessAction.ACTION_TYPE:

            tableModel = (action as TableNextPageSuccessAction).tableModel;
            tableModel.pagination.current_page = getSelectedTable(state).pagination.current_page + 1;

            return {
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: updateTableModels(state, tableModel)
            };


        case TablePreviousPageSuccessAction.ACTION_TYPE:

            tableModel = (action as TablePreviousPageSuccessAction).tableModel;
            tableModel.pagination.current_page = getSelectedTable(state).pagination.current_page - 1;

            return {
                selectedEntity: state.selectedEntity,
                entitySpecs: state.entitySpecs,
                tableModels: updateTableModels(state, tableModel)
            };

        case EntitySelectAction.ACTION_TYPE:

            let nextState = {
                ...state, selectedEntity: (action as EntitySelectAction).key
            }

            return nextState;


        default:
            return state;
    }
}
