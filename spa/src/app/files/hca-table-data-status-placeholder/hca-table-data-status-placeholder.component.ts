/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Table data status placeholder component.
 */


// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "hca-table-data-status-placeholder",
    templateUrl: "./hca-table-data-status-placeholder.component.html",
    styleUrls: ["./hca-table-data-status-placeholder.component.scss"],
    animations: [
        trigger(
            "statusAnimation", [
                transition(":leave", [
                    style({opacity: 1}),
                    animate("300ms 0.1s ease-out", style({opacity: 0}))
                ])
            ]
        )
    ]
})

export class HCATableDataStatusPlaceholderComponent {

    // Inputs
    @Input() isData: any[];
    @Input() loading: boolean;

    /**
     * Public API
     */

    /**
     * Returns a string if the table is loading or has an empty data set.
     * @returns {string}
     */
    public getTableStatus(): string {

        if ( this.loading ) {
            return "Loading...";
        }

        if ( !this.loading && this.isData.length === 0 ) {
            return "No Results";
        }

        return "";
    }
}
