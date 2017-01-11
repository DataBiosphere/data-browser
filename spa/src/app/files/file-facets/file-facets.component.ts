// Core dependencies
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";
import { MdDialog, MdDialogConfig, MdDialogRef } from "@angular/material";

// App dependencies
import { FacetTermChartData } from "../facet-term-chart/facet-term-chart-data";
import { FileFacetSelectedEvent } from "./file-facet.events";
import { FileFacetFormDialog } from "../file-facet-form/file-facet-form.dialog";
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";

/**
 * Component for displaying grid of facets.
 */
@Component({
    selector: "bw-file-facets",
    templateUrl: "./file-facets.component.html",
    styleUrls: ["./file-facets.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetsComponent {

    // Locals
    private dialog: MdDialog;

    // Inputs
    @Input() fileFacets: FileFacet[];

    // Outputs
    @Output() termSelected = new EventEmitter<FileFacetSelectedEvent>();

    /**
     * Requires MD for displaying facet edit mode.
     *
     * @param dialog {MdDialog}
     */
    constructor(dialog: MdDialog) {

        this.dialog = dialog;
    }

    /**
     * PUBLIC API
     */

    /**
     * Build up data model to back horizontal bar chart.
     *
     * @param fileFacet {FileFacet}
     */
    public getFacetTermChartData(fileFacet: FileFacet): FacetTermChartData {

        // If no terms are selected, show data for all terms.
        if ( !fileFacet.selected ) {
            return new FacetTermChartData(fileFacet.name, fileFacet.terms, fileFacet.total);
        }

        // Otherwise if any terms are selected, only selected terms should be displayed in chart data.
        let selectedTerms: Term[] = fileFacet.selectedTerms;
        let selectedCount: number = _.reduce(selectedTerms, (total: number, term: Term) => {
            return total + term.count;
        }, 0);

        return new FacetTermChartData(fileFacet.name, selectedTerms, selectedCount);
    };


    /**
     * Let parent component know of facet term has been selected by user.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        // Update facet state
        this.termSelected.emit(fileFacetSelectedEvent);

        // Show edit mode - set selected facet on dialog instance
        this.showEditMode(fileFacetSelectedEvent.facet);
    }

    /**
     * Display the file facet form
     *
     * @param fileFacetName {string}
     */
    public showEditMode(fileFacetName: string): void {

        // Set up dialog config
        let dialogConfig: MdDialogConfig = new MdDialogConfig();
        dialogConfig.width = "336px"; // TODO revisit width here

        // Open dialog
        let dialogRef: MdDialogRef<FileFacetFormDialog> = this.dialog.open(FileFacetFormDialog, dialogConfig);

        // Set facet to be edited, on dialog
        let fileFacetForm: FileFacetFormDialog = dialogRef.componentInstance;
        fileFacetForm.fileFacetName = fileFacetName;
    }
}
