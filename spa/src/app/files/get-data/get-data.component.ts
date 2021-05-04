/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component handling init and destroy functionality across all get data-related components.
 */

// Core dependencies
import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ClearFilesFacetsAction } from "../_ngrx/facet/clear-files-facets.action";
import { FetchFilesFacetsRequestAction } from "../_ngrx/facet/fetch-files-facets-request.action";

@Component({
    selector: "get-data",
    template: "<router-outlet></router-outlet>",
    styleUrls: ["./get-data.component.scss"]
})

export class GetDataComponent implements OnDestroy {

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Clear files facets from store.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearFilesFacetsAction());
    }

    /**
     * Set up state.
     */
    public ngOnInit() {

        // Get the list of facets to display. Must pull these from the files endpoint.
        this.store.dispatch(new FetchFilesFacetsRequestAction());
    }
}
