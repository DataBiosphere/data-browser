/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file-related state.
 */

// App dependencies
import { CatalogState } from "./catalog/catalog.state";
import { FacetState } from "./facet/facet.state";
import { FileManifestState } from "./file-manifest/file-manifest.state";
import { FileSummaryState } from "./file-summary/file-summary.state";
import { IntegrationState } from "./integration/integration.state";
import { ProjectState } from "./project/project.state";
import { ProjectEditsState } from "./project-edits/project-edits.state";
import { SearchState } from "./search/search.state";
import { TableState } from "./table/table.state";
import { TerraState } from "./terra/terra.state";

export interface FileState {
    catalog: CatalogState,
    terra: TerraState;
    fileSummary: FileSummaryState;
    facet: FacetState;
    fileManifest: FileManifestState;
    integration: IntegrationState,
    project: ProjectState;
    projectEdits: ProjectEditsState,
    search: SearchState;
    tableState: TableState;
}
