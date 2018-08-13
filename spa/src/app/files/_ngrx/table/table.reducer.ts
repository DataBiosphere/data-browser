/**
 * Table Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
import { Action } from "@ngrx/store";
import { TableState } from "./table.state";
import {
    FetchTableDataSuccessAction,
    TableNextPageSuccessAction,
    TablePreviousPageSuccessAction
} from "./table.actions";

export function reducer(state: TableState = TableState.getDefaultState(), action: Action): TableState {


    let tableState: TableState;

    switch (action.type) {

        case FetchTableDataSuccessAction.ACTION_TYPE:
            tableState = TableState.getNewTableState(action as FetchTableDataSuccessAction);
            tableState.tableModel.pagination.current_page = 1;
            return tableState;

        case TableNextPageSuccessAction.ACTION_TYPE:
            tableState = TableState.getNewTableState(action as FetchTableDataSuccessAction);
            tableState.tableModel.pagination.current_page = state.tableModel.pagination.current_page + 1;
            return tableState
        case TablePreviousPageSuccessAction.ACTION_TYPE:
            tableState = TableState.getNewTableState(action as FetchTableDataSuccessAction);
            tableState.tableModel.pagination.current_page = state.tableModel.pagination.current_page - 1;
            return tableState

        default:
            return state;
    }
}
