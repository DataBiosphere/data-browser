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
import { TableState } from "./table/table.state";
import { MatrixState } from "./matrix/matrix.state";
import { SearchState } from "./search/search.state";

export interface FileState {
    terra: TerraState;
    fileSummary: FileSummaryState;
    fileFacetList: FileFacetListState;
    fileManifest: FileManifestState;
    matrix: MatrixState;
    search: SearchState;
    tableState: TableState;
}
