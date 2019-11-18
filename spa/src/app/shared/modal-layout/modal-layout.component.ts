/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying modal.
 */

// Core dependencies
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "modal-layout",
    templateUrl: "./modal-layout.component.html",
    styleUrls: ["./modal-layout.component.scss"]
})
export class ModalLayoutComponent {
    
    @Output() closed = new EventEmitter<boolean>();

    /**
     * Let parent component know modal is to be closed.
     */
    public onCloseClicked(): void {
        
        this.closed.emit(true);
    }
}
