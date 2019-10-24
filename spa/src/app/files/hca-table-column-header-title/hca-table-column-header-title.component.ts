/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for table header title.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { getColumnDescription, getTooltipStyle, isColumnSort } from "../table/table-methods";

@Component({
    selector: "hca-table-column-header-title",
    templateUrl: "./hca-table-column-header-title.component.html",
    styleUrls: ["./hca-table-column-header-title.component.scss"]
})

export class HCATableColumnHeaderTitleComponent {

    // Inputs
    @Input() columnName: string;

    // Template variables
    public getColumnDescription = getColumnDescription;
    public getTooltipStyle = getTooltipStyle;
    public isColumnSort = isColumnSort;
}
