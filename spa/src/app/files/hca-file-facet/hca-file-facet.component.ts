/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component responsible for displaying an individual facet and its terms, as well as functionality around selecting
 * terms and displaying edit facet (term) menu.
 * HCA specific
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
import { CamelToSpacePipe } from "../../cc-pipe/camel-to-space/camel-to-space.pipe";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FacetTermChartData } from "../facet-term-chart/facet-term-chart-data";
import { Term } from "../shared/term.model";
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";

@Component({
    selector: "hca-file-facet",
    templateUrl: "./hca-file-facet.component.html",
    styleUrls: ["./hca-file-facet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HCAFileFacetComponent {

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
     * Returns facet name in correct format.  preservationMethod is renamed Storage Method.
     * @param facetName
     * @returns {any}
     */
    public getFacetName(facetName) {

        if ( facetName === "preservationMethod" ) {
            return "Storage Method";
        }
        else {
            return (new CamelToSpacePipe().transform(facetName));
        }
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
