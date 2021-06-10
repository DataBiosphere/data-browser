/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component controlling get data flows.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ClearFilesFacetsAction } from "../_ngrx/facet/clear-files-facets.action";

@Component({
    selector: "get-data",
    templateUrl: "./get-data.component.html",
    styleUrls: ["./get-data.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GetDataComponent implements OnDestroy {

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {
    }

    /**
     * Clear files facets on destroy.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearFilesFacetsAction());
    }
}
