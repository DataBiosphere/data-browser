/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying summary counts as well as the export selected data button.
 */

// Core dependencies
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { AppState } from "../../_ngrx/app.state";
import { Store } from "@ngrx/store";

// App dependencies
import { FileSummary } from "../file-summary/file-summary.model";
import { CountSizePipe } from "../../pipe/count-size/count-size.pipe";
import { LocaleStringPipe } from "../../pipe/locale-string/locale-string.pipe";

@Component({
    selector: "hca-file-summary",
    templateUrl: "./hca-file-summary.component.html",
    styleUrls: ["./hca-file-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HCAFileSummaryComponent {
    // Inputs
    @Input() showDownload: boolean;
    @Input() summary: FileSummary;

    /**
     * @param store {Store<AppState>}
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Returns true if the count value is not formatted by CountSizePipe.
     * Value will be less than 1,000 if true.
     *
     * @param {number} count
     * @returns {boolean}
     */
    public isTooltipDisabled(count: number): boolean {
        return (
            new CountSizePipe().transform(count) ===
            new LocaleStringPipe().transform(count)
        );
    }
}
