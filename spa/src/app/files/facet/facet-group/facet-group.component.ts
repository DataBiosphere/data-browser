/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying a group of facets when contained inside a menu.
 */

// Core dependencies
import { Component, EventEmitter, HostListener, Output } from "@angular/core";

// App dependencies

@Component({
    selector: "facet-group",
    templateUrl: "./facet-group.component.html",
    styleUrls: ["./facet-group.component.scss"],
})
export class FacetGroupComponent {

    // Ouput
    @Output() menuOpen = new EventEmitter<boolean>();

    /**
     * Prevents event propagation when click event is inside facet group.
     * Method will allow the menu to remain open when a click event is inside the card, by
     * stopping the propagation of click event to @HostListener. A click event on the close icon closes card.
     *
     * @param event
     */
    @HostListener("click", ['$event'])
    public onClickFacetGroup(event) {

        const closeFacetGroup = event.target.id === "close-facet-group";

        if ( !closeFacetGroup ) {

            event.stopPropagation();
        }
    }
}
