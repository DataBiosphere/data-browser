/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for table cell.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "hca-table-cell",
    templateUrl: "./hca-table-cell.component.html",
    styleUrls: ["./hca-table-cell.component.scss"]
})

export class HCATableCellComponent {

    // Inputs
    @Input() cellContent: string;
    @Input() contentEllipsis: boolean;
}
