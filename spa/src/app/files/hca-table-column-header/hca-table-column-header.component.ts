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
    @Input() domainCountsByColumnName: Map<string, number>;
    @Input() domainCountVisibleForColumns: string[];
    @Input() tooltipDescription: string;

    /**
     * Public API
     */

    /**
     * Return a count of the set of values for the specified column.
     *
     * @param {string} columnName
     * @returns {number}
     */
    public getDomainCount(columnName: string): number {

        return this.domainCountsByColumnName.get(columnName);
    }

    /**
     * Return a count of the set of values for the specified column.
     *
     * @param {string} columnName
     * @returns {number}
     */
    public getDomainCountDisplayText(columnName: string): string {

        return `${this.getDomainCount(columnName)}`;
    }

    /**
     * Returns true if the count of the set of values is to be displayed for specified column, and there are in fact
     * counts for this column.
     *
     * @param {string} columnName
     * @returns {boolean}
     */
    public isDomainCountVisible(columnName: string): boolean {

        return this.domainCountVisibleForColumns.indexOf(columnName) >= 0 && this.getDomainCount(columnName) > 0;
    }
}
