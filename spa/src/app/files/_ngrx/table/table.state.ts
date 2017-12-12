import { PaginationModel } from "../../table/pagination.model";
import { TableModel } from "../../table/table.model";
import { FetchTableDataSuccessAction } from "./table.actions";


export class TableState {

   public readonly tableModel: TableModel;

    constructor(tableModel: TableModel) {
        this.tableModel = tableModel;
    }


    public static getDefaultState() {
        return new TableState(new TableModel([], {  from: 1, size: 50 } as PaginationModel));
    }

    public static getNewTableModel(action: FetchTableDataSuccessAction ) {
        return new TableState(action.tableModel);
    }

}
