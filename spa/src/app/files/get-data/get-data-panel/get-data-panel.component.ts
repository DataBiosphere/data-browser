/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get data panel component.
 */

// Core dependencies
import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "get-data-panel",
    templateUrl: "./get-data-panel.component.html",
    styleUrls: ["./get-data-panel.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class GetDataPanelComponent {
    // Inputs
    @Input() downloadError: boolean;
    @Input() loading: boolean;
}
