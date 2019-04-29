/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Displays list file type summaries, and checkbox indicating if the corresponding file format facet term is currently
 * in set of selected search terms.
 */

// Core dependencies
import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { FileTypeSummaryView } from "./file-type-summary-view.model";
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { FileFacetName } from "../shared/file-facet-name.model";
import { TermSortService } from "../sort/term-sort.service";

@Component({
    selector: "file-type-summary-list",
    templateUrl: "file-type-summary-list.component.html",
    styleUrls: ["file-type-summary-list.component.scss"]
})
export class FileTypeSummaryListComponent implements OnInit {

    // Inputs
    @Input() selectedSearchTermNames: string[];
    @Input() fileTypeSummaries: FileTypeSummary[];

    // Locals
    private selectToggle = false;

    /**
     * @param {TermSortService} termSortService
     * @param {Store<AppState>} store
     */
    constructor(private termSortService: TermSortService, private store: Store<AppState>) {
    }

    /**
     * Public API
     */

    /**
     * Return the list of file types to display, including a "selected" indicator if the corresponding file format
     * facet term is selected.
     *
     * @returns {FileTypeSummaryView[]}
     */
    public getDisplayList(): FileTypeSummaryView[] {

        // Return fileTypeSummary, excluding matrix file type
        const fileTypeSummaryViews = this.fileTypeSummaries
            .filter(fileTypeSummary => fileTypeSummary.fileType !== "matrix")
            .map(fileTypeSummary => {

                return new FileTypeSummaryView(
                    fileTypeSummary.fileType,
                    fileTypeSummary.totalSize,
                    fileTypeSummary.count,
                    this.selectedSearchTermNames.indexOf(fileTypeSummary.fileType) >= 0);
        });
        
        this.termSortService.sortTerms(FileFacetName.FILE_FORMAT, fileTypeSummaryViews);
        
        return fileTypeSummaryViews;
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
    public onClickFacetTerm(facetFileTypeSummary: FileTypeSummaryView): void {

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
