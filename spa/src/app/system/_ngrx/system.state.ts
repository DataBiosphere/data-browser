/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of system-related state.
 */

// App dependencies
import { HealthState } from "./health/health.state";
import { IndexState } from "./index/index.state";

export interface SystemState {
    health: HealthState;
    index: IndexState;
}
