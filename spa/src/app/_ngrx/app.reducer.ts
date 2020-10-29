/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Complete set of reducers used by app.
 */

// App dependencies
import * as configReducer from "../config/_ngrx/config.reducer";
import * as fileReducer from "../files/_ngrx/file.reducer";
import * as httpReducer from "../http/_ngrx/http.reducer";
import * as supportRequestReducer from "../support-request/_ngrx/support-request.reducer";
import * as systemReducer from "../system/_ngrx/system.reducer";
import * as terraReducer from "../files/_ngrx/terra/terra.reducer";

export const AppReducers = {
    ...fileReducer.reducer,
    config: configReducer.reducer,
    http: httpReducer.reducer,
    supportRequest: supportRequestReducer.reducer,
    system: systemReducer.reducer,
    terra: terraReducer.reducer
};
