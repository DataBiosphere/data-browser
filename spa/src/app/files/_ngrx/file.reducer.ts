/*
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Set of file-related reducers.
 */

// App dependencies
import * as fileFacetListReducer from "./file-facet-list/file-facet-list.reducer";
import * as fileFacetMetadataSummaryReducer from "./file-facet-metadata-summary/file-facet-metadata-summary.reducer";
import * as fileManifestSummaryReducer from "./file-manifest-summary/file-manifest-summary.reducer";
import * as fileSummaryReducer from "./file-summary/file-summary.reducer";
import * as tableReducer from "./table/table.reducer";
import * as unfacetedFileFacetReducer from "./file-facet-list/unfaceted-file-facet.reducer";
import * as unfacetedFileSummaryReducer from "./file-summary/unfaceted-file-summary.reducer";

export const reducer = {
    fileFacetList: fileFacetListReducer.reducer,
    fileFacetMetadataSummary: fileFacetMetadataSummaryReducer.reducer,
    fileManifestSummary: fileManifestSummaryReducer.reducer,
    fileSummary: fileSummaryReducer.reducer,
    tableState: tableReducer.reducer,
    unfacetedFileFacets: unfacetedFileFacetReducer.reducer,
    unfacetedFileSummary: unfacetedFileSummaryReducer.reducer
};
