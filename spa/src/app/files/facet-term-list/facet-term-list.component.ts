/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Displays list of facet terms, including checkbox indicating if term is currently selected, as well as corresponding
 * count. Emits "facetTermSelected" event on click of term.
 *
 * Manually added MD checkbox to template to prevent flash of animation on select of facet. Once flash is fixed,
 * the following can be added back to the template, the corresponding hand-rolled code can be removed from the template. CSS
 * must also be updated.
 * <md-checkbox [checked]="term.selected">{{term.name}}<span class="md-caption secondary">{{term.count | localeString}}</span></md-checkbox>
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileNameShortenerPipe } from "../file-search/file-name-shortener";
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";

@Component({
    selector: "facet-term-list",
    templateUrl: "facet-term-list.component.html",
    styleUrls: ["facet-term-list.component.scss"]
})
export class FacetTermListComponent {

    // Locals
    private fileNameShortenerPipe: FileNameShortenerPipe;

    // Inputs
    @Input() fileFacet: FileFacet;
    @Input() useShortList: boolean;

    // Outputs
    @Output() facetTermSelected = new EventEmitter<FileFacetSelectedEvent>();

    /**
     * Create file name shortener pipe for formatting selected file names (for search file facets only).
     */
    constructor() {

        this.fileNameShortenerPipe = new FileNameShortenerPipe();
    }

    /**
     * Public API
     */

    /**
     * Depending on the type of facet, return a formatted version of the term name. If facet is a search facet,
     * term name is truncated according to pipe definition. Term names for facets that are not search, are left
     * as is, and are truncated via CSS with an ellipsis.
     *
     * @param termName {string}
     * @returns {string}
     */
    formatTermName(termName: string): string {

        // Truncate term name if file facet is search (file ID or donor ID).
        if ( this.fileFacet.isInterfaceTypeSearch() ) {

            return this.fileNameShortenerPipe.transform(termName);
        }

        // Otherwise return term name as is
        return termName;
    }

    /**
     * Return the inline style configuration for the chart legend, for the specified term.
     *
     * @param term {Term}
     * @returns {any}
     */
    getLegendStyle(term: Term): any {

        // Default to MD hint if term has no color.
        let color = term.color;
        if ( !color ) {
            color = "#d6d6d8";
        }

        // Both selected and unselected terms have a border
        let style = {
            "border-color": color
        };

        // If term is selected, set the background color as well
        if ( term.selected ) {

            style["background-color"] = color;
        }

        return style;
    }

    /**
     * Returns true if term name is truncated with ellipsis. Note, this is not calculated exactly (as ellipsis is 
     * controlled by CSS) and is just an approximation.
     * 
     * @param termName {string}
     * @returns {boolean}
     */
    isTermNameTruncated(termName: string): boolean {

        return termName.length > 33;
    }

    /**
     * Handle click on individual term - emit event to parent.
     *
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    onClickFacetTerm(fileFacet: FileFacet, term: Term): void {

        // Update facet state
        this.facetTermSelected.emit(new FileFacetSelectedEvent(fileFacet.name, term.name));
    }

    /**
     * Return the base list of terms to display - if no facets have been selected, display up to the first
     * three terms, otherwise display up to the first three selected terms.
     *
     * @returns {Term[]}
     */
    public getDisplayList(): Term[] {

        if ( this.useShortList ) {
            return this.fileFacet.shortList;
        }

        return this.fileFacet.terms;
    }
}
