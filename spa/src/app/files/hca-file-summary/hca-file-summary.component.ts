/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying summary counts as well as Matrix and download buttons.
 */

// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy
} from "@angular/core";
import { AppState } from "../../_ngrx/app.state";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { FileSummary } from "../file-summary/file-summary";

@Component({
    selector: "hca-file-summary",
    templateUrl: "./hca-file-summary.component.html",
    styleUrls: ["./hca-file-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAFileSummaryComponent {

    // Locals
    private store: Store<AppState>;

    // Inputs
    @Input() showDownload: boolean;
    @Input() showRequestMatrix: boolean;
    @Input() summary: FileSummary;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {
        this.store = store;
    }
}
