// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    SimpleChange,
    OnInit,
    OnChanges,
    OnDestroy,
    ViewChild
} from "@angular/core";
import { MdMenuTrigger } from "@angular/material";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FacetTermChartData } from "../facet-term-chart/facet-term-chart-data";
import { Term } from "../shared/term.model";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { SelectFileFacetAction, ClearSelectedFacetAction } from "../actions/file-actions";


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
export class FileFacetComponent implements OnChanges, OnInit, OnDestroy {

    // Privates
    private store: Store<BoardwalkStore>;

    // Inputs
    @Input() fileFacet: FileFacet;
    @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

    /**
     * @param store {Store<BoardwalkStore>}
     */
    constructor(store: Store<BoardwalkStore>) {

        this.store = store;
    }



    ngOnInit() {
        console.log("initing file facet");
        this.trigger.onMenuClose.subscribe(
            (event) => {
                this.store.dispatch(new ClearSelectedFacetAction());
            });
    }

    ngOnDestroy() {
      //  console.log("destroying file facet");
    }


    ngOnChanges(changes: { [ propName: string]: SimpleChange }) {
     //   console.log("Change detected:", changes["fileFacet"].currentValue);
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
    };

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

        this.store.dispatch(new SelectFileFacetAction(new FileFacetSelectedEvent(fileFacet, term)));
    }

    /**
     * Close the menu for this facet. This event is emitted from the child menu component.
     */
    public onCloseMenu() {

        this.trigger.closeMenu();
    }

    /**
     * Handle click on term in list of terms - emit event to parent.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }
}
