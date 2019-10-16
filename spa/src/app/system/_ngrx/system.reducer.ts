/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of system-related reducers.
 */

// App dependencies
import * as healthReducer from "./health/health.reducer";
import * as indexReducer from "./index/index.reducer";

export const reducer = {
    index: indexReducer.reducer,
    health: healthReducer.reducer
};
