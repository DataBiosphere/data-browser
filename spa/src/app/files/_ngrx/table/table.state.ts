import { PaginationModel } from "../../table/pagination.model";
import { TableModel } from "../../table/table.model";
import { FetchTableDataSuccessAction } from "./table.actions";
import { DEFAULT_CONFIG } from "tslint/lib/configuration";
import { DEFAULT_TABLE_PARAMS } from "../../table/table-params.model";


export class TableState {

   public readonly tableModel: TableModel;

    constructor(tableModel: TableModel) {
        this.tableModel = tableModel;
    }


    public static getDefaultState() {
        return new TableState(new TableModel([], DEFAULT_TABLE_PARAMS as PaginationModel));
    }

    public static getNewTableModel(action: FetchTableDataSuccessAction ) {
        return new TableState(action.tableModel);
    }

}

