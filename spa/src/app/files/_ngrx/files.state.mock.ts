/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of possible file states.
 */

// App dependencies
import { CatalogState } from "./catalog/catalog.state";
import { FacetState } from "./facet/facet.state";
import { FileSummaryState } from "./file-summary/file-summary.state";
import { FilesState } from "./files.state";
import { FileManifestState } from "./file-manifest/file-manifest.state";
import { ProjectState } from "./project/project.state";
import { SearchState } from "./search/search.state";
import { TerraState } from "./terra/terra.state";
import { EntityName } from "../shared/entity-name.model";
import * as searchStateMock from "./search/search.state.mock";
import { IntegrationState } from "./integration/integration.state";
import { ProjectEditsState } from "./project-edits/project-edits.state";
import { getDefaultTableState } from "./table/table.state";

/**
 * Default project state - current tab is projects, no selected search terms
 */
export const DEFAULT_PROJECTS_STATE = {
    catalog: CatalogState.getDefaultState(),
    fileSummary: FileSummaryState.getDefaultState(),
    facet: FacetState.getDefaultState(),
    fileManifest: FileManifestState.getDefaultState(),
    integration: IntegrationState.getDefaultState(),
    project: ProjectState.getDefaultState(),
    projectEdits: ProjectEditsState.getDefaultState(),
    search: SearchState.getDefaultState(),
    tableState: getDefaultTableState(),
    terra: TerraState.getDefaultState(),
};

/**
 * Projects tab with a selected project search term
 */
export const PROJECTS_STATE_WITH_PROJECT_SEARCH_TERM = selectProject(
    DEFAULT_PROJECTS_STATE
);

/**
 * Default samples state - current tab is samples, no selected search terms
 */
export const DEFAULT_SAMPLES_STATE = selectEntity(
    DEFAULT_PROJECTS_STATE,
    EntityName.SAMPLES
);

/**
 * Samples tab with a selected project search term
 */
export const SAMPLES_STATE_WITH_SEARCH_TERM = selectProject(
    DEFAULT_SAMPLES_STATE
);

/**
 * Default files state - current tab is files, no selected search terms
 */
export const DEFAULT_FILES_STATE = selectEntity(
    DEFAULT_PROJECTS_STATE,
    EntityName.FILES
);

/**
 * Files tab with a selected project search term
 */
export const FILES_STATE_WITH_SEARCH_TERM = selectProject(DEFAULT_FILES_STATE);

/**
 * Add a project search term to the specified state.
 *
 * @param {FilesState} fromState
 * @returns {FilesState}
 */
function selectProject(fromState: FilesState): FilesState {
    const updatedState = Object.assign({}, fromState);
    updatedState.search = searchStateMock.selectProject();
    return updatedState;
}

/**
 * Set the specified tab as the selected.
 *
 * @param {FilesState} fromState
 * @param {string} selectedEntity
 * @returns {FilesState}
 */
function selectEntity(
    fromState: FilesState,
    selectedEntity: string
): FilesState {
    const updatedState = Object.assign({}, fromState, {
        tableState: getDefaultTableState(),
    });
    updatedState.tableState.selectedEntity = selectedEntity;

    return updatedState;
}
