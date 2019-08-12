/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get data panel component.
 */

// Core dependencies
import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "hca-get-data-panel",
    templateUrl: "./hca-get-data-panel.component.html",
    styleUrls: ["./hca-get-data-panel.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class HCAGetDataPanelComponent {

    // Inputs
    @Input() downloadError: boolean;
    @Input() loading: boolean;
}
