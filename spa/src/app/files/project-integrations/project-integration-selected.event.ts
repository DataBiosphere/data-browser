/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Event emitted when integration link is clicked.
 */

// App dependencies
import { Integration } from "../_ngrx/integration/integration.model";
import { Portal } from "../_ngrx/integration/portal.model";

export class IntegrationViewedEvent {
    /**
     * @param {Portal} portal
     * @param {Integration} integration
     */
    constructor(
        public readonly portal: Portal,
        public readonly integration: Integration
    ) {}
}
