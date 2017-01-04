// Core dependencies
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";

// App dependencies
import { FileFacetSelectedEvent } from "./file-facet.events";
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";

/**
 * Component for displaying grid of facets.
 *
 * Manually added MD checkbox to template to prevent flash of animation on select of facet. Once flash is fixed,
 * the following can be added back to the template, the corresponding hand-rolled code can be removed from the template. CSS
 * must also be updated.
 * <md-checkbox [checked]="term.selected">{{term.name}}<span class="md-caption secondary">{{term.count | localeString}}</span></md-checkbox>
 */
@Component({
    selector: "bw-file-facets",
    templateUrl: "./file-facets.component.html",
    styleUrls: ["./file-facets.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetsComponent {

    // Inputs
    @Input() fileFacets: FileFacet[];

    // Outputs
    @Output() termSelected = new EventEmitter<FileFacetSelectedEvent>();

    /**
     * PUBLIC API
     */

    /**
     * Let parent component know of facet term has been selected by user.
     *
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    selectFacetTerm(fileFacet: FileFacet, term: Term) {

        this.termSelected.emit(new FileFacetSelectedEvent(fileFacet,term));
    }
}
