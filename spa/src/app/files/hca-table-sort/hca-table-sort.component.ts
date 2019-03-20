/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Styles for hca specific table header cell sort mat-sort-header.
 */

// Core dependencies
import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "hca-table-sort",
    templateUrl: "./hca-table-sort.component.html",
    styleUrls: ["./hca-table-sort.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class HCATableSortComponent {

    // Inputs
    @Input() columnSort: boolean;

    /**
     * Returns false if no value set - default is column sort is always enabled unless otherwise specified
     * @returns {boolean}
     */
    public isColumnSortDisabled(): boolean {

        if ( this.columnSort === false ) {
            return true;
        }

        return false;
    }
}
