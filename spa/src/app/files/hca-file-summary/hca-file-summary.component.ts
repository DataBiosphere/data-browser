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
import { CountSizePipe } from "../../cc-pipe/count-size/count-size.pipe";
import { FileSummary } from "../file-summary/file-summary";
import { LocaleStringPipe } from "../../cc-pipe/locale-string/locale-string.pipe";

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
    @Input() matrixEnabled: boolean;
    @Input() summary: FileSummary;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {
        this.store = store;
    }

    /**
     * Returns true if the count value is not formatted by CountSizePipe.
     * Value will be less than 1,000 if true.
     * @param {number} count
     * @returns {boolean}
     */
    public isDisabled(count: number): boolean {

        return new CountSizePipe().transform(count) === new LocaleStringPipe().transform(count);
    }
}
