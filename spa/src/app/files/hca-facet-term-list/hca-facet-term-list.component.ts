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
 * HCA specific
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { CountSizePipe } from "../../cc-pipe/count-size/count-size.pipe";
import { LocaleStringPipe } from "../../cc-pipe/locale-string/locale-string.pipe";
import { FileFacetTermSelectedEvent } from "../shared/file-facet-term-selected.event";
import { FileNameShortenerPipe } from "../shared/file-name-shortener";
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";

@Component({
    selector: "hca-facet-term-list",
    templateUrl: "hca-facet-term-list.component.html",
    styleUrls: ["hca-facet-term-list.component.scss"]
})
export class HCAFacetTermListComponent {

    // Locals
    private fileNameShortenerPipe: FileNameShortenerPipe;

    // Inputs
    @Input() fileFacet: FileFacet;
    @Input() useShortList: boolean;

    // Outputs
    @Output() facetTermSelected = new EventEmitter<FileFacetTermSelectedEvent>();

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
     * Return the base list of terms to display.
     *
     * @returns {Term[]}
     */
    public getDisplayList(): Term[] {

        return this.fileFacet.terms;
    }

    /**
     * Return the inline style configuration for the chart legend, for the specified term.
     *
     * @param term {Term}
     * @returns {any}
     */
    getLegendStyle(term: Term): any {

        // If term is selected, set the background color as well
        if ( term.selected ) {

            let style = {
                "border-color": "#1F6B9A",
                "background-color": "#1C7CC7"
            };

            return style;
        }
    }

    /**
     * Returns class truncate if displayValue is not spaced
     * @param termName
     * @returns {string}
     */
    public getTruncatedClass(termName) {

        if ( termName.indexOf(" ") == -1 ) {
            return "truncate";
        }
    }

    /**
     * Returns true if the term count value is not formatted by CountSizePipe.
     * Value will be less than 1,000 if true.
     * @param {number} termCount
     * @returns {boolean}
     */
    public isDisabled(termCount: number): boolean {

        return new CountSizePipe().transform(termCount) === new LocaleStringPipe().transform(termCount);
    }

    /**
     * Handle click on individual facet term or entity - emit event to parent.
     *
     * @param {FileFacet} fileFacet
     * @param {Term} term
     */
    public onClickFacetTerm(fileFacet: FileFacet, term: Term): void {

        // Update facet state
        this.facetTermSelected.emit(new FileFacetTermSelectedEvent(fileFacet.name, term.name, !term.selected));
    }

    /**
     * Track by function used when displaying the list of terms or entities.
     *
     * @param {number} index
     * @param {Term} term
     * @returns {string}
     */
    public trackByFn(index: number, term: Term): string {

        return term.name;
    }
}
