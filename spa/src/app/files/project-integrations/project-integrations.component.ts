/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying integrations for a specific project.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { Portal } from "../_ngrx/integration/portal.model";

@Component({
    selector: "project-integrations",
    templateUrl: "./project-integrations.component.html",
    styleUrls: ["./project-integrations.component.scss"]
})

export class ProjectIntegrationsComponent {

    // Inputs
    @Input() integrations: Portal[];
}
