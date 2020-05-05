/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file-related state.
 */

// App dependencies
import { FacetState } from "./facet/facet.state";
import { FileManifestState } from "./file-manifest/file-manifest.state";
import { FileSummaryState } from "./file-summary/file-summary.state";
import { IntegrationState } from "./integration/integration.state";
import { MatrixState } from "./matrix/matrix.state";
import { ProjectState } from "./project/project.state";
import { ProjectEditsState } from "./project-edits/project-edits.state";
import { ReleaseState } from "./release/release.state";
import { SearchState } from "./search/search.state";
import { TableState } from "./table/table.state";
import { TerraState } from "./terra/terra.state";

export interface FileState {
    terra: TerraState;
    fileSummary: FileSummaryState;
    facet: FacetState;
    fileManifest: FileManifestState;
    integration: IntegrationState,
    matrix: MatrixState;
    project: ProjectState;
    projectEdits: ProjectEditsState,
    release: ReleaseState,
    search: SearchState;
    tableState: TableState;
}
