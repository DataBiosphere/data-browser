/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get data panel component.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "status-panel",
    templateUrl: "./status-panel.component.html",
    styleUrls: ["./status-panel.component.scss"]
})
export class StatusPanelComponent {

    // Inputs
    @Input() error: boolean;
    @Input() loading: boolean;
}
