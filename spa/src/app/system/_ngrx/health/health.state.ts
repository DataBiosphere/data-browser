/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of indexing status-related state.
 */

// App dependencies
import { HealthSuccessAction } from "./health-success.action";

export class HealthState {

    /**
     * @param {boolean} indexing
     */
    constructor(public indexing: boolean) {
    }

    /**
     * Return the current health status on request of health check.
     *
     * @returns {HealthState}
     */
    public healthCheckRequest(): HealthState {

        return this;
    }

    /**
     * Health check response has been returned from the backend - update state.
     *
     * @param {HealthSuccessAction} action
     * @returns {HealthState}
     */
    public receiveHealth(action: HealthSuccessAction): HealthState {

        return new HealthState(action.indexing);
    }

    /**
     * Default status of indexing is false.
     *
     * @returns {HealthState}
     */
    public static getDefaultState() {

        return new HealthState(false);
    }
}
