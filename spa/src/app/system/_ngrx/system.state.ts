/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of system-related state.
 */

// App dependencies
import { HealthState } from "./health/health.state";

export interface SystemState {
    health: HealthState;
}
