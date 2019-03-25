/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file-related state.
 */

// App dependencies
import { TerraState } from "./terra/terra.state";
import { FileFacetListState } from "./file-facet-list/file-facet-list.state";
import { FileFacetMetadataSummaryState } from "./file-facet-metadata-summary/file-facet-metadata-summary.state";
import { FileManifestSummaryState } from "./file-manifest-summary/file-manifest-summary.state";
import { FileSummaryState } from "./file-summary/file-summary.state";
import { TableState } from "./table/table.state";
import { MatrixState } from "./matrix/matrix.state";

export interface FileState {
    terraState: TerraState;
    fileSummary: FileSummaryState;
    fileFacetList: FileFacetListState;
    fileManifestSummary: FileManifestSummaryState;
    fileFacetMetadataSummary: FileFacetMetadataSummaryState;
    manifestDownloadFileSummary: FileSummaryState;
    matrix: MatrixState;
    tableState: TableState;
}
