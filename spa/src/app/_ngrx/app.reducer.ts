/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Set of reducers used by Boardwalk.
 */

// App dependencies
import * as authReducer from "../auth/_ngrx/auth.reducer";
import * as configReducer from "../config/_ngrx/config.reducer";
import * as fileReducer from "../files/_ngrx/file.reducer";
import * as httpReducer from "../http/_ngrx/http.reducer";
import * as systemReducer from "../system/_ngrx/system.reducer";
import * as terraReducer from "../files/_ngrx/terra/terra.reducer";

export const AppReducers = {
    ...fileReducer.reducer,
    auth: authReducer.reducer,
    config: configReducer.reducer,
    http: httpReducer.reducer,
    ...systemReducer.reducer,
    terra: terraReducer.reducer
};
