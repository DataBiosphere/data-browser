/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of state of table that displays entity (project, sample or file) data.
 */

// App dependencies
import { EntityName } from "../../shared/entity-name.model";
import EntitySpec from "../../shared/entity-spec";
import { Project } from "../../shared/project.model";
import { Pagination } from "../../table/pagination/pagination.model";
import { TableModel } from "../../table/table.model";
import { DEFAULT_TABLE_PARAMS } from "../../table/pagination/table-params.model";

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
export function clearUnselectedTableModels(
    tableState: TableState
): TableModel[] {
    return tableState.tableModels.map((tm) => {
        if (tm.tableName !== tableState.selectedEntity) {
            return createEmptyTableModel(tm.tableName);
        } else {
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
        pagination: DEFAULT_TABLE_PARAMS as Pagination,
        termCountsByFacetName: new Map<string, number>(),
        tableName: entityName,
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
            createEmptyTableModel(EntityName.FILES),
        ],
        entitySpecs: [
            { key: EntityName.PROJECTS, displayName: "Projects" },
            { key: EntityName.SAMPLES, displayName: "Samples" },
            { key: EntityName.FILES, displayName: "Files" },
        ],
    };
}

/**
 * Return the table corresponding to the selected entity.
 * @param {TableState} tableState
 * @returns {TableModel}
 */
export function getSelectedTable(tableState: TableState): TableModel {
    return tableState.tableModels.find(
        (tableModel) => tableModel.tableName === tableState.selectedEntity
    );
}

/**
 * Return the selected entity
 * @param {TableState} tableState
 * @returns {EntitySpec}
 */
export function getSelectedEntitySpec(tableState: TableState): EntitySpec {
    return tableState.entitySpecs.find(
        (entity) => entity.key === tableState.selectedEntity
    );
}

/**
 * Replace the table model corresponding to the selected entity, with the given table model.
 *
 * @param {TableState} tableState
 * @param {TableModel} tableModel
 * @returns {TableModel[]}
 */
export function updateSelectedTableModel(
    tableState: TableState,
    tableModel: TableModel
): TableModel[] {
    return tableState.tableModels.map((tm) => {
        if (tm.tableName === tableState.selectedEntity) {
            return tableModel;
        }

        return tm;
    });
}

/**
 * Replace the table model data corresponding to the selected entity, with the given table model.
 *
 * @param {TableState} tableState
 * @param {any[]} data
 * @param {Pagination} pagination
 * @param {Map<string, number>} termCountsByFacetName
 * @returns {TableModel[]}
 */
export function updateSelectedTableModelData(
    tableState: TableState,
    data: any[],
    pagination: Pagination,
    termCountsByFacetName: Map<string, number>
): TableModel[] {
    return tableState.tableModels.map((tm) => {
        if (tm.tableName === tableState.selectedEntity) {
            return {
                ...tm,
                data,
                loading: false,
                pagination,
                termCountsByFacetName,
            };
        }

        return tm;
    });
}

/**
 * Replace the term counts for the current table model with the specified counts.
 *
 * @param {TableState} tableState
 * @param {TableModel} termCountsByFacetName
 * @returns {Map<string, number>}
 */
export function updateSelectedTableTermCounts(
    tableState: TableState,
    termCountsByFacetName: Map<string, number>
): TableModel[] {
    return tableState.tableModels.map((tm) => {
        if (tm.tableName === tableState.selectedEntity) {
            return {
                ...tm,
                termCountsByFacetName: termCountsByFacetName,
            };
        }

        return tm;
    });
}
