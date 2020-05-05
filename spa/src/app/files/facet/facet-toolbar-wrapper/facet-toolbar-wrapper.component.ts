/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component for filtering of facet terms by name, wraps filter and result.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { Facet } from "../facet.model";
import { SearchTerm } from "../../search/search-term.model";
import EntitySpec from "../../shared/entity-spec";

@Component({
    selector: "facet-toolbar-wrapper",
    templateUrl: "./facet-toolbar-wrapper.component.html",
    styleUrls: ["./facet-toolbar-wrapper.component.scss"],
})

export class FacetToolbarWrapperComponent {

    // Inputs
    @Input() facets: Facet[];
    @Input() searchTerms: SearchTerm[]; // Set of search terms to select from
    @Input() selectedEntity: EntitySpec;
    @Input() selectedSearchTerms: SearchTerm[]; // Current set of selected search terms

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();

    /**
     * Event emitted when filtering menus are open - to prevent body scroll.
     */
    public isMenuOpen(value) {

        this.menuOpen.emit(value);
    }
}
