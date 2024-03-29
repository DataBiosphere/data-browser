/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for modal layout.
 */

// Core dependencies
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "modal-layout",
    templateUrl: "./modal-layout.component.html",
    styleUrls: ["./modal-layout.component.scss"],
    animations: [
        trigger("fadeIn", [
            transition(":enter", [
                style({ opacity: 0 }),
                animate(
                    "500ms cubic-bezier(0.25, 0.8, 0.25, 1)",
                    style({ opacity: 1 })
                ),
            ]),
        ]),
    ],
})
export class ModalLayoutComponent {
    @Input() loaded: boolean; // True when subtitle and content project content are ready to be displayed
    @Output() closed = new EventEmitter<boolean>();

    /**
     * Let parent component know modal is to be closed.
     */
    public onCloseClicked(): void {
        this.closed.emit(true);
    }
}
