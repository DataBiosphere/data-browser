// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { Term } from "../shared/term.model";

/**
 * Displays list of facet terms, including checkbox indicating if term is currently selected, as well as corresponding
 * count. Emits "facetTermSelected" event on click of term.
 *
 * Manually added MD checkbox to template to prevent flash of animation on select of facet. Once flash is fixed,
 * the following can be added back to the template, the corresponding hand-rolled code can be removed from the template. CSS
 * must also be updated.
 * <md-checkbox [checked]="term.selected">{{term.name}}<span class="md-caption secondary">{{term.count | localeString}}</span></md-checkbox>
 */

@Component({
    selector: "facet-term-list",
    templateUrl: "facet-term-list.component.html",
    styleUrls: ["facet-term-list.component.scss"]
})
export class FacetTermListComponent {

    // Inputs
    @Input() fileFacet: FileFacet;

    // Outputs
    @Output() facetTermSelected = new EventEmitter<FileFacetSelectedEvent>();

    /**
     * Public API
     */

    /**
     * Handle click on individual term - emit event to parent.
     *
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    onClickFacetTerm(fileFacet: FileFacet, term: Term): void {

        // Update facet state
        this.facetTermSelected.emit(new FileFacetSelectedEvent(fileFacet, term));
    }
}
