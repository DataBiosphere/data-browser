/*
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Set of system-related reducers.
 */

// App dependencies
import * as healthReducer from "./health/health.reducer";

export const reducer = {
    health: healthReducer.reducer
};
