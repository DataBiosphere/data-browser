/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying HCA explore bar.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy
} from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { DownloadFileManifestAction } from "../_ngrx/file-manifest-summary/file-manifest-summary.actions";

// import { FileSummary } from "../file-summary/file-summary";

@Component({
    selector: "hca-explore",
    templateUrl: "./hca-file-filter-wrapper.component.html",
    styleUrls: ["./hca-file-filter-wrapper.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAExploreComponent {

    // TODO check all of this, as Fran added everything below for download icon
    // Locals
    private store: Store<AppState>;

    // Public variables


    /**
     * @param route {ActivatedRoute}
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {
        this.store = store;
    }

    /**
     * Dispatch action to download manifest summary.
     */
    public onDownloadManifest() {

        this.store.dispatch(new DownloadFileManifestAction());
    }

}
