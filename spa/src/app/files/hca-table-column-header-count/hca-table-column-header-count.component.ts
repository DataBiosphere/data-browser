/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for table column header count labels.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { getColumnCountType } from "../table/table-methods";
import { getColumnCountName } from "../table/table-methods";

@Component({
    selector: "hca-table-column-header-count",
    templateUrl: "./hca-table-column-header-count.component.html",
    styleUrls: ["./hca-table-column-header-count.component.scss"]
})

export class HCATableColumnHeaderCountComponent {

    // Inputs
    @Input() columnName: string;
    @Input() domainCountsByColumnName: Map<string, number>;
    @Input() summaryCount: string;

    // Template variables
    tooltipContentForCount = "Count of distinct values for this facet in the current search result set.";

    /**
     * Return a count of the set of values for the specified column.
     *
     * @param {string} columnName
     * @returns {number}
     */
    public getDomainCount(columnName: string): number {

        const columnCountName = getColumnCountName(columnName);
        return this.domainCountsByColumnName.get(columnCountName);
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

        return getColumnCountType(columnName) === "DOMAIN_COUNT" && this.getDomainCount(columnName) > 0;
    }

    /**
     * Returns true if the summary count is to be displayed for specified column.
     *
     * @param {string} columnName
     * @returns {boolean}
     */
    public isSummaryCountVisible(columnName: string): boolean {

        return getColumnCountType(columnName) === "SUMMARY_COUNT" && this.summaryCount !== "0";
    }
}
