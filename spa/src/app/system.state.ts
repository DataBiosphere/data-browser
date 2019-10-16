/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing top level app component.
 */

// App dependencies
import { HealthState } from "./system/_ngrx/health/health.state";
import { IndexState } from "./system/_ngrx/index/index.state";

export interface SystemState {

    health: HealthState;
    index: IndexState;
}
