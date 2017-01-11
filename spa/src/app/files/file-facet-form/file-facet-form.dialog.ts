// Core dependencies
import { Component, OnInit } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

// App dependencies
import { SelectFileFacetAction } from "../actions/file-actions";
import { FacetTermChartData } from "../facet-term-chart/facet-term-chart-data";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { selectFileFacetByName } from "../files.reducer";
import { FileFacet } from "../shared/file-facet.model";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { Term } from "../shared/term.model";

/**
 * Component for displaying facet edit mode (displayed inside MD dialog).
 */
@Component({
    selector: "file-facet-form",
    templateUrl: "./file-facet-form.dialog.html",
    styleUrls: ["./file-facet-form.dialog.scss"]
})
export class FileFacetFormDialog implements OnInit {

    // Public variables
    public fileFacetName: string;

    // Privates
    private dialogRef: MdDialogRef<FileFacetFormDialog>;
    private store: Store<BoardwalkStore>;
    private fileFacet$: Observable<FileFacet>;

    /**
     * Inject dialog ref so we can close dialog from template, as well as store so we can get the latest state of the
     * facet.
     *
     * @param dialogRef {MdDialogRef<FileFacetFormDialog>}
     * @param store {Store}
     */
    constructor (dialogRef: MdDialogRef<FileFacetFormDialog>, store: Store<BoardwalkStore>) {

        this.dialogRef = dialogRef;
        this.store = store;
    }

    /**
     * Public API
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
     * Handle selection of facet term - dispatch update of state to store.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent): void {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Hooks
     */

    /**
     * Set up selector to retrieve latest state of selected facet, from store.
     */
    public ngOnInit() {

        // TODO revisit selector/reducer/function thingo here.
        this.fileFacet$ = selectFileFacetByName(this.store, this.fileFacetName);
    }
}