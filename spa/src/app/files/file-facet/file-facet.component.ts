// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    ViewChild
} from "@angular/core";
import { MdMenuTrigger } from "@angular/material";
import { Store } from "@ngrx/store";
import * as _ from "lodash";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FacetTermChartData } from "../facet-term-chart/facet-term-chart-data";
import { Term } from "../shared/term.model";
import { AppState } from "../../_ngrx/app.state";
import { ClearSelectedFileFacetsAction, SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";


/**
 * Component responsible for displaying an individual facet and its terms, as well as functionality around selecting
 * terms and display edit facet menu.
 */
@Component({
    selector: "bw-file-facet",
    templateUrl: "./file-facet.component.html",
    styleUrls: ["./file-facet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetComponent implements OnInit {

    // Privates
    private store: Store<AppState>;

    // Inputs
    @Input() fileFacet: FileFacet;
    @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {

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
        if (!fileFacet.selected) {
            return new FacetTermChartData(fileFacet.name, fileFacet.terms, fileFacet.total);
        }

        // Otherwise if any terms are selected, only selected terms should be displayed in chart data.
        let selectedTerms: Term[] = fileFacet.selectedTerms;
        let selectedCount: number = _.reduce(selectedTerms, (total: number, term: Term) => {
            return total + term.count;
        }, 0);

        return new FacetTermChartData(fileFacet.name, selectedTerms, selectedCount);
    }

    /**
     * Term has been selected from edit mode, cancel click event (to prevent close of menu) and emit select
     * event to parent.
     *
     * @param event {Event}
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    public selectFacetTerm(event: Event, fileFacet: FileFacet, term: Term) {

        // Prevent menu from closing (on click)
        event.stopPropagation();
        event.preventDefault();

        this.store.dispatch(new SelectFileFacetAction(new FileFacetSelectedEvent(fileFacet.name, term.name)));
    }

    /**
     * Close the menu for this facet. This event is emitted from the child menu component.
     */
    public onCloseMenu() {

        this.trigger.closeMenu();
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up initial state of component.
     */
    ngOnInit() {

        // Clear the selected facet in the store, on close of any open menu.
        this.trigger.onMenuClose.subscribe(() => {
            this.store.dispatch(new ClearSelectedFileFacetsAction());
        });
    }
}
