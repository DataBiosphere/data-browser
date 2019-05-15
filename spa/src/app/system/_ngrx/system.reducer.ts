/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of system-related reducers.
 */

// App dependencies
import * as healthReducer from "./health/health.reducer";

export const reducer = {
    health: healthReducer.reducer
};
