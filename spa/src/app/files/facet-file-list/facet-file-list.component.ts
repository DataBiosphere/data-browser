/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Displays list file type summaries, and checkbox indicating if file type is currently in set of selected file facets.
 */

// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileNameShortenerPipe } from "../file-search/file-name-shortener";
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { FacetFileTypeSummary } from "./facet-file-type-summary.model";

@Component({
    selector: "facet-file-list",
    templateUrl: "facet-file-list.component.html",
    styleUrls: ["facet-file-list.component.scss"]
})
export class FacetFileListComponent implements OnInit {

    // Inputs
    @Input() selectedFileFacets: FileFacet[];
    @Input() fileTypeSummaries: FileTypeSummary[];

    // Locals
    private fileNameShortenerPipe: FileNameShortenerPipe;
    private selectToggle = false;

    /**
     * Create file name shortener pipe for formatting selected file names (for search file facets only).
     */
    constructor(private store: Store<AppState>) {
        this.fileNameShortenerPipe = new FileNameShortenerPipe();
    }

    /**
     * Public API
     */

    /**
     * Return the list of file types to display.
     *
     * @returns {Term[]}
     */
    public getDisplayList(): FacetFileTypeSummary[] {

        // Determine the current set of selected file types
        const selectedFileTypes = this.listSelectedFileTypes(this.selectedFileFacets);

        // Return fileTypeSummary, excluding matrix file type
        return this.fileTypeSummaries.filter(fileTypeSummary => fileTypeSummary.fileType !== "matrix").map(fileTypeSummary => {

                return {
                    count: fileTypeSummary.count,
                    selected: selectedFileTypes.indexOf(fileTypeSummary.fileType) >= 0,
                    size: fileTypeSummary.totalSize,
                    termName: fileTypeSummary.fileType
                };
        });
    }

    /**
     * Return the inline style configuration for the chart legend, for the specified facet file type summary.
     *
     * @param showLegend
     * @returns {any}
     */
    public getLegendStyle(showLegend): any {

        // If term is selected, set the background color as well
        if ( showLegend ) {

            return {
                "border-color": "#1F6B9A",
                "background-color": "#1C7CC7"
            };
        }

        return {};
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
     * Return list of file types that are in the current set of selected file facets.
     *
     * @param {FileFacet[]} selectedFileFacets
     * @returns {string[]}
     */
    public listSelectedFileTypes(selectedFileFacets: FileFacet[]): string[] {

        return this.selectedFileFacets.reduce((accum, fileFacet) => {

            fileFacet.terms.forEach(term => {

                if ( term.selected ) {
                    accum.push(term.name);
                }
            });

            return accum;
        }, []);
    }

    /**
     * Handle click on individual facet file type summary - emit event to parent.
     *
     * @param facetFileTypeSummary {FacetFileTypeSummary}
     */
    public onClickFacetTerm(facetFileTypeSummary: FacetFileTypeSummary): void {

        this.store.dispatch(new SelectFileFacetAction(
            new FileFacetSelectedEvent("fileFormat", facetFileTypeSummary.termName, true)));
    }

    /**
     * Handle click on "select all" facet file types.
     */
    public onClickSelectAll(): void {

        this.selectToggle = !this.selectToggle;
        this.getDisplayList().map((facetFileTypeSummary) => {

            if ( this.selectToggle && facetFileTypeSummary.selected === false ) {
                this.onClickFacetTerm(facetFileTypeSummary);
            }

            if ( !this.selectToggle && facetFileTypeSummary.selected === true ) {
                this.onClickFacetTerm(facetFileTypeSummary);
            }
        });
    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up state of selectToggle.
     */
    public ngOnInit() {

        this.selectToggle = !this.getDisplayList().some(facetFileTypeSummary => facetFileTypeSummary.selected === false);
    }
}
