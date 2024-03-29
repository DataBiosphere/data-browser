/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Complete set of reducers used by app.
 */

// App dependencies
import * as configReducer from "../config/_ngrx/config.reducer";
import * as filesReducer from "../files/_ngrx/files.reducer";
import * as httpReducer from "../http/_ngrx/http.reducer";
import * as supportRequestReducer from "../support-request/_ngrx/support-request.reducer";
import * as systemReducer from "../system/_ngrx/system.reducer";
import * as terraReducer from "../files/_ngrx/terra/terra.reducer";

export const AppReducers = {
    ...filesReducer.reducer,
    config: configReducer.reducer,
    http: httpReducer.reducer,
    system: systemReducer.reducer,
    terra: terraReducer.reducer,
};
