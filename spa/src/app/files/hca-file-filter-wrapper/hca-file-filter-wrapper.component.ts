// Core dependencies
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FileFacet } from "../shared/file-facet.model";

/**
 * Component wrapper for filtering of term name.
 */
@Component({
    selector: "hca-file-filter-wrapper",
    templateUrl: "./hca-file-filter-wrapper.component.html",
    styleUrls: ["./hca-file-filter-wrapper.component.scss"],
})

export class HCAFileFilterWrapperComponent {

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();

    /**
     * Public API
     */

    /**
     * Event emitted when filtering menus are open - to prevent body scroll.
     */
    public isMenuOpen(value) {
        this.menuOpen.emit(value);
    }
}
