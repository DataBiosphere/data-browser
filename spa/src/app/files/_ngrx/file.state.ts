/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file-related state.
 */

// App dependencies
import { TerraState } from "./terra/terra.state";
import { FileFacetListState } from "./file-facet-list/file-facet-list.state";
import { FileManifestState } from "./file-manifest/file-manifest.state";
import { FileSummaryState } from "./file-summary/file-summary.state";
import { IntegrationState } from "./integration/integration.state";
import { MatrixState } from "./matrix/matrix.state";
import { ProjectState } from "./project/project.state";
import { SearchState } from "./search/search.state";
import { TableState } from "./table/table.state";

export interface FileState {
    terra: TerraState;
    fileSummary: FileSummaryState;
    fileFacetList: FileFacetListState;
    fileManifest: FileManifestState;
    integration: IntegrationState,
    matrix: MatrixState;
    project: ProjectState;
    search: SearchState;
    tableState: TableState;
}
