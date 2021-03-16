/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Displays list file type summaries, and checkbox indicating if the corresponding file format facet term is currently
 * in set of selected search terms. Used when selecting files type for manifest generation or export to Terra. Populated
 * from fileTypeSummaries value in summary API call.
 */

// Core dependencies
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { FacetTermSelectedEvent } from "../facet/file-facet/facet-term-selected.event";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { FileTypeSummaryView } from "./file-type-summary-view.model";
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

    // Outputs
    @Output() facetTermSelected = new EventEmitter<FacetTermSelectedEvent>();

    // Locals
    private selectAll = true;

    /**
     * @param {TermSortService} termSortService
     * @param {Store<AppState>} store
     */
    constructor(private termSortService: TermSortService, private store: Store<AppState>) {
    }

    /**
     * Return the list of file types to display, including a "selected" indicator if the corresponding file format
     * facet term is selected.
     *
     * @returns {FileTypeSummaryView[]}
     */
    public getDisplayList(): FileTypeSummaryView[] {

        // Return view model of file type summary
        const fileTypeSummaryViews = this.fileTypeSummaries
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
     * Returns display text for the "Select All" text button.
     * @returns {string}
     */
    public getSelectAllDisplayText(): string {
        return this.selectAll ? "Select All" : "Select None";
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
     * @param facetFileTypeSummary {FileTypeSummaryView}
     */
    public onClickFacetTerm(facetFileTypeSummary: FileTypeSummaryView): void {

        const termName = facetFileTypeSummary.termName;
        const selected = facetFileTypeSummary.selected;
        this.facetTermSelected.emit(new FacetTermSelectedEvent(FileFacetName.FILE_FORMAT, termName, !selected));
    }

    /**
     * Handle click on "select all" facet file types.
     */
    public onClickSelectAll(): void {

        this.selectAll = !this.selectAll;
        this.getDisplayList().map((facetFileTypeSummary) => {

            if ( !this.selectAll && facetFileTypeSummary.selected === false ) {
                this.onClickFacetTerm(facetFileTypeSummary);
            }

            if ( this.selectAll && facetFileTypeSummary.selected === true ) {
                this.onClickFacetTerm(facetFileTypeSummary);
            }
        });
    }

    /**
     * Set up state of "Select All" text.
     */
    public ngOnInit() {

        this.selectAll = this.getDisplayList().some(facetFileTypeSummary => facetFileTypeSummary.selected === false);
    }
}
