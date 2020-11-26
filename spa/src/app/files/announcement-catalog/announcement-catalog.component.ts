/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying catalog announcement banner.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";
import { Store } from "@ngrx/store";
import { SelectCatalogAction } from "../_ngrx/table/select-catalog.action";

@Component({
    selector: "announcement-catalog",
    templateUrl: "./announcement-catalog.component.html",
    styleUrls: ["./announcement-catalog.component.scss"]
})
export class AnnouncementCatalogComponent {

    // Inputs
    @Input() catalog: Catalog;

    /**
     *
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     */
    constructor(private configService: ConfigService, private store: Store<AppState>) {}

    /**
     * Returns the URL to the catalog announcement page.
     */
    public getCatalogAnnouncementUrl(): string {

        return `${this.configService.getPortalUrl()}/coming-soon-DCP-2-with-support-for-controlled-access-data`;
    }

    /**
     * Returns true if the catalog is DCP2.
     *
     * @returns {boolean}
     */
    public isCatalogDCP2(): boolean {

        return this.catalog === Catalog.DCP2;
    }

    /**
     * Handle select of catalog.
     *
     */
    public onCatalogSelected(catalog: Catalog) {

        this.store.dispatch(new SelectCatalogAction(catalog));
    }
}
