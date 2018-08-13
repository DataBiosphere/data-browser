/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of state of table that displays file-facet related data.
 */

import { PaginationModel } from "../../table/pagination.model";
import { TableModel } from "../../table/table.model";
import { FetchTableDataSuccessAction } from "./table.actions";
import { DEFAULT_TABLE_PARAMS } from "../../table/table-params.model";

export class TableState {

    public readonly tableModel: TableModel;

    /**
     * @param {TableModel} tableModel
     */
    constructor(tableModel: TableModel) {
        this.tableModel = tableModel;
    }

    /**
     * Return the default state for setting up table.
     *
     * @returns {TableState}
     */
    public static getDefaultState() {
        return new TableState(new TableModel([], DEFAULT_TABLE_PARAMS as PaginationModel));
    }

    /**
     * Build new table state from data returned from table data API end point.
     *
     * @param {FetchTableDataSuccessAction} action
     * @returns {TableState}
     */
    public static getNewTableState(action: FetchTableDataSuccessAction): TableState {
        return new TableState(action.tableModel);
    }
}

