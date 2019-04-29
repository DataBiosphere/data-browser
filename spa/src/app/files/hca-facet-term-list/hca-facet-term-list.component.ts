/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Displays list of facet terms, including checkbox indicating if term is currently selected, as well as corresponding
 * count. Emits "facetTermSelected" event on click of term.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { CountSizePipe } from "../../cc-pipe/count-size/count-size.pipe";
import { LocaleStringPipe } from "../../cc-pipe/locale-string/locale-string.pipe";
import { FileFacetTermSelectedEvent } from "../shared/file-facet-term-selected.event";
import { Term } from "../shared/term.model";

@Component({
    selector: "hca-facet-term-list",
    templateUrl: "hca-facet-term-list.component.html",
    styleUrls: ["hca-facet-term-list.component.scss"]
})
export class HCAFacetTermListComponent {

    // Inputs
    @Input() fileFacetName: string;
    @Input() terms: Term[];
    @Input() useShortList: boolean;

    // Outputs
    @Output() facetTermSelected = new EventEmitter<FileFacetTermSelectedEvent>();

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
     * @param {string} fileFacetName
     * @param {Term} term
     */
    public onClickFacetTerm(fileFacetName: string, term: Term): void {

        // Update facet state
        this.facetTermSelected.emit(new FileFacetTermSelectedEvent(fileFacetName, term.name, !term.selected));
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
