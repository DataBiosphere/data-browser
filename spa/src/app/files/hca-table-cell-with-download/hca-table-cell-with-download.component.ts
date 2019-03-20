/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for table cell - with download file function.
 */

// Core dependencies
import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "hca-table-cell-with-download",
    templateUrl: "./hca-table-cell-with-download.component.html",
    styleUrls: ["./hca-table-cell-with-download.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class HCATableCellWithDownloadComponent {

    // Inputs
    @Input() cellContent: string;
    @Input() contentEllipsis: boolean;
}
