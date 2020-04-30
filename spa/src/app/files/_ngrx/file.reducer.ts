/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of file-related reducers.
 */

// App dependencies
import * as facetReducer from "./facet/facet.reducer";
import * as fileSummaryReducer from "./file-summary/file-summary.reducer";
import * as fileManifestReducer from "./file-manifest/file-manifest.reducer";
import * as integrationReducer from "./integration/integration.reducer";
import * as matrixReducer from "./matrix/matrix.reducer";
import * as projectReducer from "./project/project.reducer";
import * as projectEditsReducer from "./project-edits/project-edits.reducer";
import * as releaseReducer from "./release/release.reducer";
import * as tableReducer from "./table/table.reducer";
import * as searchReducer from "./search/search.reducer";

export const reducer = {
    facet: facetReducer.reducer,
    fileManifest: fileManifestReducer.reducer,
    fileSummary: fileSummaryReducer.reducer,
    integration: integrationReducer.reducer,
    matrix: matrixReducer.reducer,
    project: projectReducer.reducer,
    projectEdits: projectEditsReducer.reducer,
    release: releaseReducer.reducer,
    search: searchReducer.reducer,
    tableState: tableReducer.reducer
};
