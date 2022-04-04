/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Styles for hca specific tooltip.
 */

// Core dependencies
import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "hca-tooltip",
    templateUrl: "./hca-tooltip.component.html",
    styleUrls: ["./hca-tooltip.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class HCATooltipComponent {
    // Inputs
    @Input() tableCellContentWrapper: boolean;
    @Input() tooltipClass: string;
    @Input() tooltipContent: string;
    @Input() tooltipDisabled: boolean;
    @Input() tooltipPosition: string;

    // Template variables
    tooltipShowDelay = 0;
}
