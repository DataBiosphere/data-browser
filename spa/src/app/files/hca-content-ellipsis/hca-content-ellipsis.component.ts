/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Ellipsis component.
 */

// Core dependencies
import { Component, ElementRef, ViewChild } from "@angular/core";

// App dependencies
import { HCATooltipComponent } from "../../shared/hca-tooltip/hca-tooltip.component";
import { HCAEllipsisTextComponent } from "./hca-ellipsis-text.component";

@Component({
    selector: "hca-content-ellipsis",
    templateUrl: "./hca-content-ellipsis.component.html",
    styleUrls: ["./hca-content-ellipsis.component.scss"]
})

export class HCAContentEllipsisComponent {

    // View child/ren. Static false for both as we must wait for after view init (ie child components have been initialized)
    @ViewChild(HCAEllipsisTextComponent, { read: ElementRef, static: false }) textElementRef: ElementRef; 
    @ViewChild(HCATooltipComponent, { read: ElementRef, static: false }) tooltipElementRef: ElementRef;

    /**
     * Returns the text content of the element of interest.
     *
     * @returns {string}
     */
    public getTooltipContent(): string {

        // Return empty string if there is no text child
        if ( !this.textElementRef ) {
            return "";
        }

        // Grab the content of the text child. Remove any trailing slashes - this is specific to multi value columns
        // and can be removed once multi value column implementation is refactored. TODO.
        const tooltipContent = this.textElementRef.nativeElement.textContent;
        if ( tooltipContent.endsWith("/") ) {
            return tooltipContent.slice(0, -1);
        }
        return this.textElementRef.nativeElement.textContent;
    }

    /**
     * Returns true (disable tooltip) if the width of the element of interest is less than its parent container.
     * If false, an ellipsis has been applied to the text and on hover, a tooltip will reveal the element's content.
     *
     * @returns {boolean}
     */
    public isTooltipDisabled(): boolean {

        // Return false if we didn't find a tooltip child or a text child
        if ( !this.tooltipElementRef || !this.textElementRef ) {
            return false;
        }

        // Grab the width of the text to be displayed
        const contentWidth = this.textElementRef.nativeElement.getBoundingClientRect().width;

        // We can use the tooltip to determine the width available
        const containerWidth = this.tooltipElementRef.nativeElement.getBoundingClientRect().width;

        // The tooltip is only enabled if the width of the ellipsis content is wider than the container width
        return contentWidth <= containerWidth;
    }
}
