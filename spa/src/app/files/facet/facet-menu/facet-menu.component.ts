/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying a group of facets when contained inside a menu.
 */

// Core dependencies
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from "@angular/core";
import { MatIcon } from "@angular/material";

// App dependencies

@Component({
    selector: "facet-menu",
    templateUrl: "./facet-menu.component.html",
    styleUrls: ["./facet-menu.component.scss"],
})
export class FacetMenuComponent {

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();
    
    // View child/ren
    @ViewChild(MatIcon, {read: ElementRef, static: false}) closeElRef: ElementRef;

    /**
     * Prevents event propagation when click event is inside facet group.
     * Method will allow the menu to remain open when a click event is inside the card, by
     * stopping the propagation of click event to @HostListener. A click event on the close icon closes card.
     *
     * @param event
     */
    @HostListener("click", ['$event'])
    public onClickFacetGroup(event) {

        if ( !this.closeElRef ) {
            return;
        }

        if ( this.closeElRef.nativeElement !== event.target ) {
            event.stopPropagation();
        }
    }
}
