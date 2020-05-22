/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model, accessors and mutators of system-related state. 
 */

// App dependencies
import { SystemStatus } from "./system-status.model";
import { SystemStatusSuccessAction } from "./system-status-success.action";

export class SystemState {
    
    /**
     * @param {SystemStatus} systemStatus
     */
    constructor(public systemStatus: SystemStatus) {}

    /**
     * Return the current system status on request of system status check.
     *
     * @returns {SystemState}
     */
    public onSystemStatusRequested(): SystemState {

        return this;
    }
    
    /**
     * Health check response has been returned from the backend - update state.
     *
     * @param {SystemStatusSuccessAction} action
     * @returns {SystemState}
     */
    public onSystemStatusReceived(action: SystemStatusSuccessAction): SystemState {

        return new SystemState({ok: action.ok, indexing: action.indexing});
    }
    
    /**
     * Default status is overall status is OK and indexing is false.
     *
     * @returns {SystemState}
     */
    public static getDefaultState() {
    
        return new SystemState({
            ok: true,
            indexing: false
        });
    }
}

