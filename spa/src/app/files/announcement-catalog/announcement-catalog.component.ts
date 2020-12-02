/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying catalog announcement banner.
 */

// Core dependencies
import { Component, Inject, Input } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";
import { EntityName } from "../shared/entity-name.model";

@Component({
    selector: "announcement-catalog",
    templateUrl: "./announcement-catalog.component.html",
    styleUrls: ["./announcement-catalog.component.scss"]
})
export class AnnouncementCatalogComponent {

    // Inputs
    @Input() catalog: Catalog;

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    constructor(private configService: ConfigService, private store: Store<AppState>, @Inject("Window") private window: Window) {}

    /**
     * Returns the URL to the catalog announcement page.
     */
    public getCatalogAnnouncementUrl(): string {

        return `${this.configService.getPortalUrl()}/dcp-updates`;
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

        this.window.location.href = `/explore/${EntityName.PROJECTS}?catalog=${catalog}`;
    }
}
