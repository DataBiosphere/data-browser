/**
 * Table Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 */
import { Action } from "@ngrx/store";
import { TableState } from "./table.state";
import { FetchTableDataSuccessAction } from "./table.actions";

export function reducer(state: TableState = TableState.getDefaultState(), action: Action): TableState {

    switch (action.type) {

        case FetchTableDataSuccessAction.ACTION_TYPE:
            return TableState.getNewTableModel(action as FetchTableDataSuccessAction);

        default:
            return state;
    }
}
