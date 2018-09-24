/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying HCA file filter results bar.
 */
// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
// App dependencies
import { ClearSelectedTermsAction, SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";

@Component({
    selector: "hca-file-filter-result",
    templateUrl: "./hca-file-filter-result.component.html",
    styleUrls: ["./hca-file-filter-result.scss"],
})

export class HCAFileFilterResultComponent {

    // Inputs
    @Input() selectedFacets: FileFacet[];
    @Input() removable: boolean;

    // locals
    store: Store<AppState>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    /**
     * Remove a single selected term.
     *
     * @param {string} facetName
     * @param {string} termName
     */
    removeFacet(facetName: string, termName: string) {
        this.store.dispatch(new SelectFileFacetAction(new FileFacetSelectedEvent(facetName, termName, false)));
    }

    /**
     * Remove all selected terms.
     *
     */
    removeAllFacets() {
        this.store.dispatch(new ClearSelectedTermsAction());
    }
}
