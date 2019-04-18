/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file-related state.
 */

// App dependencies
import { TerraState } from "./terra/terra.state";
import { FileFacetListState } from "./file-facet-list/file-facet-list.state";
import { FileSummaryState } from "./file-summary/file-summary.state";
import { TableState } from "./table/table.state";
import { MatrixState } from "./matrix/matrix.state";
import { SearchState } from "./search/search.state";

export interface FileState {
    terraState: TerraState;
    fileSummary: FileSummaryState;
    fileFacetList: FileFacetListState;
    fileManifestFileSummary: FileSummaryState;
    matrix: MatrixState;
    searchState: SearchState;
    tableState: TableState;
}
