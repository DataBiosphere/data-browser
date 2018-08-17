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

    public readonly selectedTable: string;
    public readonly tableModels: TableModel[];

    /**
     * @param {TableModel} tableModel
     */
    constructor(tableModels: TableModel[], selectedTable: string) {
        this.tableModels = tableModels;
        this.selectedTable = selectedTable;
    }

    /**
     * @returns {TableModel}
     */
    public getSelectedTable(): TableModel {

        return this.tableModels.find(tableModel => tableModel.tableName === this.selectedTable);
    }

    /**
     * Return the default state for setting up table.
     *
     * @returns {TableState}
     */
    public static getDefaultState(): TableState {
        return new TableState(
            [
                new TableModel([], DEFAULT_TABLE_PARAMS as PaginationModel, "SPECIMENS"),
                new TableModel([], DEFAULT_TABLE_PARAMS as PaginationModel, "FILES")
            ], "SPECIMENS");
    }

    /**
     * Build new table state from data returned from table data API end point.
     *
     * @param {FetchTableDataSuccessAction} action
     * @returns {TableState}
     */
    public static getNewTableState(action: FetchTableDataSuccessAction): TableState {
        return new TableState([action.tableModel], "SPECIMENS");
    }
}

