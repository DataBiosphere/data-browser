/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of file-related reducers.
 */

// App dependencies
import * as fileFacetListReducer from "./file-facet-list/file-facet-list.reducer";
import * as fileSummaryReducer from "./file-summary/file-summary.reducer";
import * as fileManifestFileSummaryReducer from "./file-manifest/file-manifest-file-summary.reducer";
import * as matrixReducer from "./matrix/matrix.reducer";
import * as tableReducer from "./table/table.reducer";
import * as searchReducer from "./search/search.reducer";

export const reducer = {
    fileFacetList: fileFacetListReducer.reducer,
    fileManifestFileSummary: fileManifestFileSummaryReducer.reducer,
    fileSummary: fileSummaryReducer.reducer,
    matrix: matrixReducer.reducer,
    search: searchReducer.reducer,
    tableState: tableReducer.reducer
};
