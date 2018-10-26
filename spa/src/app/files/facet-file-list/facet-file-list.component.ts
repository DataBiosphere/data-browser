/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Displays list of facet terms, including checkbox indicating if term is currently selected, as well as corresponding
 * count. Emits "facetTermSelected" event on click of term.
 *
 * Manually added MD checkbox to template to prevent flash of animation on select of facet. Once flash is fixed,
 * the following can be added back to the template, the corresponding hand-rolled code can be removed from the
 * template. CSS must also be updated.
 * <md-checkbox [checked]="term.selected">{{term.name}}<span class="md-caption secondary">{{term.count |
 * localeString}}</span></md-checkbox> HCA specific
 */

// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileNameShortenerPipe } from "../file-search/file-name-shortener";
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { FileTypeSummary } from "../file-summary/file-type-summary";

@Component({
    selector: "facet-file-list",
    templateUrl: "facet-file-list.component.html",
    styleUrls: ["facet-file-list.component.scss"]
})
export class FacetFileListComponent {

    // Inputs
    @Input() fileTypeSummaries: FileTypeSummary[];
    @Input() fileFacet: FileFacet[];
    @Input() unfacetedFileTypeSummaries: FileTypeSummary[];

    // Locals
    private fileNameShortenerPipe: FileNameShortenerPipe;
    private store: Store<AppState>;

    /**
     * Create file name shortener pipe for formatting selected file names (for search file facets only).
     */
    constructor(store: Store<AppState>) {
        this.store = store;
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
    public formatTermName(termName: string): string {

        // Otherwise return term name as is
        return termName;
    }

    /**
     * Return the base list of terms to display - if no facets have been selected, display up to the first
     * three terms, otherwise display up to the first three selected terms.
     *
     * @returns {Term[]}
     */
    public getDisplayList(): Term[] {

        return this.getFacet("fileFormat").terms;
    }

    /**
     * Returns the facet given a facet name
     */
    public getFacet(facetName: string): FileFacet {

        const fileFacet = this.fileFacet.find(function(fileFacet) {
            return fileFacet.name === facetName;
        });

        return fileFacet;
    }

    /**
     * @param {FileTypeSummary[]} fileTypeSummaries
     * @param {string} termName
     * @returns {FileTypeSummary}
     */
    public getFileTypeSummary(fileTypeSummaries: FileTypeSummary[], termName: string): FileTypeSummary {

        const fileTypeSummary = fileTypeSummaries.find(function(fileTypeSummary) {
            return fileTypeSummary.fileType === termName;
        });

        return fileTypeSummary;
    }

    /**
     * Return the total size for the specified term.
     *
     * @param {string} termName
     * @returns {number}
     */
    public getUnfacetedFileTypeTotal(termName: string): number {

        const fileTypeSummary = this.getFileTypeSummary(this.unfacetedFileTypeSummaries, termName);
        return fileTypeSummary ? fileTypeSummary.totalSize : 0;
    }

    /**
     * Return the inline style configuration for the chart legend, for the specified term.
     *
     * @param term {Term}
     * @returns {any}
     */
    public getLegendStyle(term: Term): any {

        // If term is selected, set the background color as well
        if (term.selected) {

            let style = {
                "border-color": "#1F6B9A",
                "background-color": "#1C7CC7"
            };

            return style;
        }
    }

    /**
     * Returns true if term name is truncated with ellipsis. Note, this is not calculated exactly (as ellipsis is
     * controlled by CSS) and is just an approximation.
     *
     * @param termName {string}
     * @returns {boolean}
     */
    public isTermNameTruncated(termName: string): boolean {

        return termName.length > 33;
    }

    /**
     * Handle click on individual term - emit event to parent.
     *
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    public onClickFacetTerm(term: Term): void {

        this.store.dispatch(new SelectFileFacetAction(
            new FileFacetSelectedEvent("fileFormat", term.name, true)));
    }
}
