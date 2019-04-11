/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Displays list file type summaries, and checkbox indicating if file type is currently in set of selected file facets.
 */

// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileNameShortenerPipe } from "../shared/file-name-shortener";
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { FacetFileTypeSummary } from "./facet-file-type-summary.model";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { FileFacetName } from "../shared/file-facet-name.model";

@Component({
    selector: "facet-file-format-list",
    templateUrl: "facet-file-format-list.component.html",
    styleUrls: ["facet-file-format-list.component.scss"]
})
export class FacetFileFormatListComponent implements OnInit {

    // Inputs
    @Input() selectedSearchTermNames: string[];
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
     * @returns {FacetFileTypeSummary[]}
     */
    public getDisplayList(): FacetFileTypeSummary[] {

        // Return fileTypeSummary, excluding matrix file type
        return this.fileTypeSummaries
            .filter(fileTypeSummary => fileTypeSummary.fileType !== "matrix")
            .map(fileTypeSummary => {

                return {
                    count: fileTypeSummary.count,
                    selected: this.selectedSearchTermNames.indexOf(fileTypeSummary.fileType) >= 0,
                    size: fileTypeSummary.totalSize,
                    termName: fileTypeSummary.fileType
                };
        });
    }

    /**
     * Return the inline style configuration for the chart legend, for the specified facet file type summary.
     *
     * @param {boolean} showLegend
     * @returns {any}
     */
    public getLegendStyle(showLegend: boolean): any {

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
     * Handle click on individual facet file type summary - emit event to parent.
     *
     * @param facetFileTypeSummary {FacetFileTypeSummary}
     */
    public onClickFacetTerm(facetFileTypeSummary: FacetFileTypeSummary): void {

        const termName = facetFileTypeSummary.termName;
        const selected = facetFileTypeSummary.selected;
        this.store.dispatch(new SelectFileFacetTermAction(FileFacetName.FILE_FORMAT, termName, !selected));
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
