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
import EntitySpec from "./EntitySpec";

export class TableState {

    public readonly selectedEntity: string;
    public readonly tableModels: TableModel[];
    public readonly entitySpecs: EntitySpec[];

    /**
     * @param {TableModel} tableModel
     */
    constructor(tableModels: TableModel[], selectedTable: string) {
        this.tableModels = tableModels;
        this.selectedEntity = selectedTable;

        this.entitySpecs = [];
        this.entitySpecs.push({ key: "specimens", displayName: "Specimens" });
        this.entitySpecs.push({ key: "files", displayName: "Files" });
    }

    /**
     * Return the default state for setting up table.
     *
     * @returns {TableState}
     */
    public static getDefaultState(): TableState {
        return new TableState(
            [
                new TableModel([], DEFAULT_TABLE_PARAMS as PaginationModel, "specimens"),
                new TableModel([], DEFAULT_TABLE_PARAMS as PaginationModel, "files")
            ], "specimens");
    }

    /**
     * Build new table state from data returned from table data API end point.
     *
     * @param {FetchTableDataSuccessAction} action
     * @returns {TableState}
     */
    public static getNewTableState(action: FetchTableDataSuccessAction): TableState {
        return new TableState([action.tableModel], "specimens");
    }

    /**
     * @returns {TableModel}
     */
    public getSelectedTable(): TableModel {

        return this.tableModels.find(tableModel => tableModel.tableName === this.selectedEntity);
    }


    public getSelectedEntity(): EntitySpec {
        return this.entitySpecs.find(entity => entity.key === this.selectedEntity);
    }
}

