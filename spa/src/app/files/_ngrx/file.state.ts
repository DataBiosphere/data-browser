import { FileSummaryState } from "./file-summary/file-summary.state";
import { FileFacetListState } from "./file-facet-list/file-facet-list.state";
import { FileManifestSummaryState } from "./file-manifest-summary/file-manifest-summary.state";
import { FileFacetMetadataSummaryState } from "./file-facet-metadata-summary/file-facet-metadata-summary.state";
import { TableState } from "./table/table.state";

export interface FileState {
    fileSummary: FileSummaryState;
    fileFacetList: FileFacetListState;
    fileManifestSummary: FileManifestSummaryState;
    fileFacetMetadataSummary: FileFacetMetadataSummaryState;
    tableState: TableState;
}