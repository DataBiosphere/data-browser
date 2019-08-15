/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Styles for hca content ellipsis component.
 */

// Core dependencies
import { Component, ElementRef, Input } from "@angular/core";

@Component({
    selector: "hca-content-ellipsis",
    templateUrl: "./hca-content-ellipsis.component.html",
    styleUrls: ["./hca-content-ellipsis.component.scss"]
})

export class HCAContentEllipsisComponent {

    // Inputs
    @Input() tooltipContent: string;

    /**
     * @param {ElementRef} elementRef
     */
    public constructor(private elementRef: ElementRef) {}

    /**
     * Returns true (disable tooltip) if the width of the element of interest is less than its parent container.
     * If false, an ellipsis has been applied to the text and on hover, a tooltip will reveal the element's content.
     *
     * @returns {boolean}
     */
    public isTooltipDisabled(): boolean {

        // Get element
        const nativeElement = this.elementRef.nativeElement;

        return nativeElement.firstElementChild.firstElementChild.firstElementChild.getBoundingClientRect().width <= nativeElement.closest("hca-table-cell").getBoundingClientRect().width;
    }
}
