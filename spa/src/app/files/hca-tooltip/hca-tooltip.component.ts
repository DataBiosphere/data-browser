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
    encapsulation: ViewEncapsulation.None
})

export class HCATooltipComponent {

    // Inputs
    @Input() contentEllipsis: boolean;
    @Input() tooltipClass: string;
    @Input() tooltipDescription: string;
    @Input() tooltipDisabled: boolean;
    @Input() tooltipPosition: string;

    // Template variables
    tooltipShowDelay = 150;

    /**
     * Public API
     */

    /**
     * Returns true as default if no value set and false if otherwise specified.
     * @returns {boolean}
     */
    public isContentEllipsis(): boolean {

        if ( this.contentEllipsis === false ) {

            return false;
        }

        return true;
    }

    /**
     * Checks if disabled tooltip has been specified as false.
     * Returns false if the text is longer than its container.
     * If false, an ellipsis has been applied to the text.
     * @param el
     * @returns {boolean}
     */
    public isTooltipDisabled(el): boolean {

        if ( this.tooltipDisabled === false ) {
            return false;
        }
        return !( el.scrollWidth > el.clientWidth );
    }
}
