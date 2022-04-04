/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying catalog chip, either NEW or UPDATED.
 */

// Core dependencies
import { DatePipe } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

// App dependencies
import { CatalogUpdate } from "../catalog-update.model";
import { Project } from "../../shared/project.model";

@Component({
    selector: "catalog-update-chip",
    templateUrl: "./catalog-update-chip.component.html",
    styleUrls: ["./catalog-update-chip.component.scss"],
})
export class CatalogUpdateChipComponent implements OnChanges {
    // Inputs
    @Input() catalogUpdate: CatalogUpdate;
    @Input() project: Project;

    // Constants
    private DATE_FORMAT = "MMMM dd, yyyy";
    private DATE_TZ = "GMT";

    // Locals
    private datePipe = new DatePipe("en-US");
    private runDate: string;

    /**
     * Returns tooltip content for the catalog update status.
     *
     * @returns {string}
     */
    public getTooltipContent(): string {
        if (this.isProjectNew()) {
            return `New in the ${this.runDate} DCP Platform Update.`;
        }

        if (this.isProjectUpdated()) {
            return `Modified in the ${this.runDate} DCP Platform Update.`;
        }

        return "";
    }

    /**
     * Returns true if the project is new in the current catalog.
     *
     * @returns {boolean}
     */
    public isProjectNew(): boolean {
        return this.catalogUpdate.new.indexOf(this.project.entryId) >= 0;
    }

    /**
     * Returns true if the project is updated in the current catalog.
     *
     * @returns {boolean}
     */
    public isProjectUpdated(): boolean {
        return this.catalogUpdate.updated.indexOf(this.project.entryId) >= 0;
    }

    /**
     * Format run date on change of catalog update.
     */
    public ngOnChanges(changes: SimpleChanges) {
        const catalogUpdateUpdate = changes.catalogUpdate.currentValue;
        if (catalogUpdateUpdate) {
            this.runDate = this.datePipe.transform(
                catalogUpdateUpdate.runDate,
                this.DATE_FORMAT,
                this.DATE_TZ
            );
        }
    }
}
