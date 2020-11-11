/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying support request button.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "support-request-button",
    templateUrl: "support-request-button.component.html",
    styleUrls: ["support-request-button.component.scss"]
})
export class SupportRequestButtonComponent {
    
    // Input
    @Input() visible: boolean;

    // Output
    @Output() buttonClicked = new EventEmitter<boolean>();

    /**
     * Handle click on support request button.
     * 
     * @param {MouseEvent} event
     */
    public onButtonClicked(event: MouseEvent) {

        event.stopPropagation();
        this.buttonClicked.emit(true);
    }
}
