import * as fileSummaryReducer from "./file-summary/file-summary.reducer";
import * as fileFacetListReducer from "./file-facet-list/file-facet-list.reducer";
import * as fileManifestSummaryReducer from "./file-manifest-summary/file-manifest-summary.reducer";
import * as fileFacetMetadataSummaryReducer from "./file-facet-metadata-summary/file-facet-metadata-summary.reducer";
import * as tableReducer from "./table/table.reducer";

export const reducer = {
    fileSummary: fileSummaryReducer.reducer,
    fileFacetList: fileFacetListReducer.reducer,
    fileManifestSummary: fileManifestSummaryReducer.reducer,
    fileFacetMetadataSummary: fileFacetMetadataSummaryReducer.reducer,
    tableState: tableReducer.reducer
};