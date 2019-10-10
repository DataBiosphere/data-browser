/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of indexing status-related state.
 */

// App dependencies
import { HealthSuccessAction } from "./health-success.action";

export class HealthState {

    /**
     * @param {boolean} ok
     */
    constructor(public readonly ok: boolean) {}

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

        return new HealthState(action.ok);
    }

    /**
     * Default status is overall status is OK and indexing is false.
     *
     * @returns {HealthState}
     */
    public static getDefaultState() {

        return new HealthState(true);
    }
}
