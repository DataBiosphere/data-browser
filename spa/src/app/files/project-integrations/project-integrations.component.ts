/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying integrations for a specific project.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { Portal } from "../_ngrx/integration/portal.model";
import { Integration } from "../_ngrx/integration/integration.model";
import { IntegrationViewedEvent } from "./project-integration-selected.event";

@Component({
    selector: "project-integrations",
    templateUrl: "./project-integrations.component.html",
    styleUrls: ["./project-integrations.component.scss"],
})
export class ProjectIntegrationsComponent {
    // Inputs/outputs
    @Input() integrations: Portal[];
    @Output() integrationViewed = new EventEmitter<IntegrationViewedEvent>();

    /**
     * Let parent components know integration link has been clicked.
     *
     * @param {Portal} portal
     * @param {Integration} integration
     */
    onIntegrationClicked(portal: Portal, integration: Integration) {
        this.integrationViewed.emit(
            new IntegrationViewedEvent(portal, integration)
        );
    }
}
