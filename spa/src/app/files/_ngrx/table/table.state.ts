/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of state of table that displays file-facet related data.
 */

import { TableModel } from "../../table/table.model";
import EntitySpec from "./entity-spec";
import { DEFAULT_TABLE_PARAMS } from "../../table/table-params.model";
import { PaginationModel } from "../../table/pagination.model";

export interface TableState {

    selectedEntity: string;
    tableModels: TableModel[];
    entitySpecs: EntitySpec[];
}


/**
 * Return the default state for setting up table.
 *
 * @returns {TableState}
 */
export function getDefaultTableState(): TableState {
    return {
        selectedEntity: "specimens",
        tableModels: [
            { data: [], pagination: DEFAULT_TABLE_PARAMS as PaginationModel, tableName: "specimens" },
            { data: [], pagination: DEFAULT_TABLE_PARAMS as PaginationModel, tableName: "files" },
        ],
        entitySpecs: [
            { key: "specimens", displayName: "Specimens" },
            { key: "files", displayName: "Files" }
        ]
    };
}


/**
 * @returns {TableModel}
 */
export function getSelectedTable(tableState: TableState): TableModel {

    return tableState.tableModels.find(
        tableModel => tableModel.tableName === tableState.selectedEntity);
}

export function getSelectedEntity(tableState: TableState): EntitySpec {
    return tableState.entitySpecs.find(entity => entity.key === tableState.selectedEntity);
}

export function updateTableModels(tableState: TableState, tableModel: TableModel): TableModel[] {

    return tableState.tableModels.map((tm) => {

        if (tm.tableName === tableState.selectedEntity) {
            return tableModel;
        }
        else {
            return tm;
        }
    });
}


