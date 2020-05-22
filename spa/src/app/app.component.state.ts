/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing top level app component.
 */
import { SystemStatus } from "./system/_ngrx/system-status.model";

// App dependencies
export interface AppComponentState {

    systemStatus: SystemStatus;
}
