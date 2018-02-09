/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 * 
 * Component responsible for displaying an individual facet and its terms, as well as functionality around selecting
 * terms and displaying edit facet (term) menu.
 */

// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as _ from "lodash";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FacetTermChartData } from "../facet-term-chart/facet-term-chart-data";
import { Term } from "../shared/term.model";
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";

@Component({
    selector: "bw-file-facet",
    templateUrl: "./file-facet.component.html",
    styleUrls: ["./file-facet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetComponent {

    // Privates
    private store: Store<AppState>;
    
    // Inputs
    @Input() fileFacet: FileFacet;

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
     * @returns {FacetTermChartData}
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
     * Return the text for the term count tooltip.
     * 
     * @param fileFacet {FileFacet}
     * @returns {string}
     */
    public getFacetTermCountTooltip(fileFacet: FileFacet): string {

        let selectedTermCount = fileFacet.selectedTermCount;
        let termCount = fileFacet.termCount;
        let termDisplayText = (termCount === 1 ? "Term" : "Terms");
        return `${selectedTermCount} of ${termCount} ${termDisplayText} Selected`;
    }

    /**
     * Return the text for the file count tooltip.
     *
     * @param fileFacet {FileFacet}
     * @returns {string}
     */
    public getFileCountTooltip(fileFacet: FileFacet): string {

        return `${fileFacet.total} Files`;
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
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }
}
