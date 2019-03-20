/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for table cell - with selection.
 */

// Core dependencies
import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "hca-table-cell-with-selector",
    templateUrl: "./hca-table-cell-with-selector.component.html",
    styleUrls: ["./hca-table-cell-with-selector.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class HCATableCellWithSelectorComponent {

    // Inputs
    @Input() cellContent: string;
    @Input() contentEllipsis: boolean;
}
