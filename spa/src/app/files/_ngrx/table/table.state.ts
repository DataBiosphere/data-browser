/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of state of table that displays file-facet related data.
 */

// App dependencies
import { EntityName } from "../../shared/entity-name.model";
import EntitySpec from "../../shared/entity-spec";
import { Project } from "../../shared/project.model";
import { PaginationModel } from "../../table/pagination.model";
import { TableModel } from "../../table/table.model";
import { DEFAULT_TABLE_PARAMS } from "../../table/table-params.model";

export interface TableState {
    selectedProject: Project; // Current selected project in table
    selectedEntity: string; // Current selected tab (eg Projects, Samples, Files)
    tableModels: TableModel[];
    entitySpecs: EntitySpec[];
}

/**
 * @param {TableState} tableState
 * @returns {TableModel[]}
 */
export function clearUnSelectedTableModels(tableState: TableState): TableModel[] {

    return tableState.tableModels.map((tm) => {

        if ( tm.tableName !== tableState.selectedEntity ) {
            return createEmptyTableModel(tm.tableName);
        }
        else {
            return tm;
        }
    });
}

/**
 * Return a default table state for the specified entity (eg projects, samples, files).
 *
 * @param {string} entityName
 * @returns {TableModel}
 */
function createEmptyTableModel(entityName: string): TableModel {
    return {
        data: [],
        loading: true,
        pagination: DEFAULT_TABLE_PARAMS as PaginationModel,
        termCountsByFacetName: new Map<string, number>(),
        tableName: entityName
    };
}

/**
 * Return the default state for setting up tables.
 * @returns {TableState}
 */
export function getDefaultTableState(): TableState {
    return {
        selectedProject: null,
        selectedEntity: EntityName.PROJECTS,
        tableModels: [
            createEmptyTableModel(EntityName.PROJECTS),
            createEmptyTableModel(EntityName.SAMPLES),
            createEmptyTableModel(EntityName.FILES)
        ],
        entitySpecs: [
            {key: EntityName.PROJECTS, displayName: "Projects"},
            {key: EntityName.SAMPLES, displayName: "Samples"},
            {key: EntityName.FILES, displayName: "Files"}
        ]
    };
}

/**
 * Return the table corresponding to the selected entity.
 * @param {TableState} tableState
 * @returns {TableModel}
 */
export function getSelectedTable(tableState: TableState): TableModel {

    return tableState.tableModels.find(
        tableModel => tableModel.tableName === tableState.selectedEntity);
}

/**
 * Return the selected entity
 * @param {TableState} tableState
 * @returns {EntitySpec}
 */
export function getSelectedEntity(tableState: TableState): EntitySpec {
    return tableState.entitySpecs.find(entity => entity.key === tableState.selectedEntity);
}

/**
 * Replace the table model corresponding to the selected entity, with the given table model.
 * @param {TableState} tableState
 * @param {TableModel} tableModel
 * @returns {TableModel[]}
 */
export function updateSelectedTableModel(tableState: TableState, tableModel: TableModel): TableModel[] {

    return tableState.tableModels.map((tm) => {

        if ( tm.tableName === tableState.selectedEntity ) {
            return tableModel;
        }
        else {
            return tm;
        }
    });
}

