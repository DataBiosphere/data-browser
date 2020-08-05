/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing top level app component.
 */

// App dependencies
import { SystemStatus } from "./system/_ngrx/system-status.model";

export interface AppComponentState {

    systemStatus?: SystemStatus;
}
