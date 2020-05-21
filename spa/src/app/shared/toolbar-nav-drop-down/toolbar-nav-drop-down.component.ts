/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying nav drop down, used in conjunction with toolbar-nav.
 */

// Dependencies
import { Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";

@Component({
    selector: "toolbar-nav-drop-down",
    templateUrl: "toolbar-nav-drop-down.component.html",
    styleUrls: ["toolbar-nav-drop-down.component.scss"],
})

export class ToolbarNavDropDownComponent implements OnInit {

    // Output
    @Output() dropDownMenuOpened = new EventEmitter<boolean>();

    /**
     * Add click handler to close the drop down menu.
     *
     */
    @HostListener("document:click")
    public onClickDocument() {

        // Any click event will close the drop down menu.
        this.onDropDownOpened(false);
    }

    /**
     * Prevents event propagation when click event is inside the drop down menu.
     * Method will allow drop down menu to remain open when a click event is inside the menu, by
     * stopping the propagation of click event to @HostListener (where any document click event closes menu).
     *
     * @param {MouseEvent} event
     */
    public onClickDropDown(event: MouseEvent) {

        event.stopPropagation();
    }

    /**
     * Let parents know the toolbar nav drop down component has either been opened or closed.
     *
     * @param {boolean} opened
     */
    public onDropDownOpened(opened: boolean) {

        this.dropDownMenuOpened.emit(opened);
    }

    /**
     * Let parents know the drop down is now open.
     */
    ngOnInit() {

        this.onDropDownOpened(true);
    }
}
