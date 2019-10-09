/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of portal-related state persisted in local store.
 */

// App dependencies
import { FetchIntegrationsByProjectIdSuccessAction } from "./fetch-integrations-by-project-id-success.action";
import { Integrations } from "./integrations.model";
import { Portal } from "./portal.model";

const DEFAULT_INTEGRATIONS_STATE = {
    integrationsByProjectId: new Map()
};

export class IntegrationState implements Integrations {

    integrationsByProjectId: Map<string, Portal[]>;

    /**
     * @param {IntegrationState} state
     */
    constructor(state: Integrations = DEFAULT_INTEGRATIONS_STATE) {
        Object.assign(this, state);
    }

    /**
     * @returns {IntegrationState}
     */
    public fetchIntegrationsByProjectIdRequest(): IntegrationState {
        return this;
    }

    /**
     * @param {FetchIntegrationsByProjectIdSuccessAction} action
     * @returns {IntegrationState}
     */
    public fetchIntegrationsByProjectIdSuccess(action: FetchIntegrationsByProjectIdSuccessAction): IntegrationState {
        const {projectId, integrations} = action;
        const updatedIntegrationsByProjectId = new Map(this.integrationsByProjectId);
        updatedIntegrationsByProjectId.set(projectId, integrations);
        return new IntegrationState({
            integrationsByProjectId: updatedIntegrationsByProjectId
        });
    }

    /**
     * @returns {IntegrationState}
     */
    public static getDefaultState() {
        return new IntegrationState();
    }
}
