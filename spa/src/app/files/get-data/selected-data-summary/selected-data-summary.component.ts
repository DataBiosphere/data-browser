/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying get data summary counts.
 */

// Core dependencies
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

// App dependencies
import { FileSummary } from "../../file-summary/file-summary.model";
import { CountSizePipe } from "../../../pipe/count-size/count-size.pipe";
import { LocaleStringPipe } from "../../../pipe/locale-string/locale-string.pipe";
import { Term } from "../../shared/term.model";

@Component({
    selector: "selected-data-summary",
    templateUrl: "./selected-data-summary.component.html",
    styleUrls: ["./selected-data-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedDataSummaryComponent {
    // Inputs
    @Input() selectedDiseases: Term[];
    @Input() selectedDonorDiseases: Term[];
    @Input() selectedGenusSpecies: Term[];
    @Input() selectedLibraryConstructionApproaches: Term[];
    @Input() selectedOrgans: Term[];
    @Input() selectedOrganParts: Term[];
    @Input() selectedPairedEnds: Term[];
    @Input() summary: FileSummary;

    /**
     * Returns a concatenation of all terms in the specified array.
     *
     * @param {Term[]} terms
     * @returns {string}
     */
    public displayTerms(terms: Term[]): string {
        if (terms && terms.length) {
            return terms.map((term) => term.name.trim()).join(", ");
        } else {
            return "Unspecified";
        }
    }

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
