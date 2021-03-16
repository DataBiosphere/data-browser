/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of file-related reducers.
 */

// App dependencies
import * as catalogReducer from "./catalog/catalog.reducer";
import * as facetReducer from "./facet/facet.reducer";
import * as fileSummaryReducer from "./file-summary/file-summary.reducer";
import * as fileManifestReducer from "./file-manifest/file-manifest.reducer";
import * as integrationReducer from "./integration/integration.reducer";
import * as initReducer from "./init/init.reducer";
import * as projectReducer from "./project/project.reducer";
import * as projectEditsReducer from "./project-edits/project-edits.reducer";
import * as tableReducer from "./table/table.reducer";
import * as searchReducer from "./search/search.reducer";

export const reducer = {
    catalog: catalogReducer.reducer,
    facet: facetReducer.reducer,
    fileManifest: fileManifestReducer.reducer,
    fileSummary: fileSummaryReducer.reducer,
    init: initReducer.reducer,
    integration: integrationReducer.reducer,
    project: projectReducer.reducer,
    projectEdits: projectEditsReducer.reducer,
    search: searchReducer.reducer,
    tableState: tableReducer.reducer
};
