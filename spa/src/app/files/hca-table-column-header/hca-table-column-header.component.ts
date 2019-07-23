/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for table header labels.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "hca-table-column-header",
    templateUrl: "./hca-table-column-header.component.html",
    styleUrls: ["./hca-table-column-header.component.scss"]
})

export class HCATableColumnHeaderComponent {

    // Inputs
    @Input() columnName: string;
    @Input() columnSort: boolean;
    @Input() tooltipContent: string;

    // Template variables
    tooltipDisabled = this.tooltipContent === null;
}
