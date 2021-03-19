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
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";
import { EntityName } from "../shared/entity-name.model";
import { ViewCatalogAction } from "../_ngrx/catalog/view-catalog.action";

@Component({
    selector: "announcement-catalog",
    templateUrl: "./announcement-catalog.component.html",
    styleUrls: ["./announcement-catalog.component.scss"]
})
export class AnnouncementCatalogComponent {

    // Inputs
    @Input() catalog: DCPCatalog;

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

        return `${this.configService.getPortalUrl()}/what-is-the-dcp-20-data-preview`;
    }

    /**
     * Returns true if the catalog is dcp1.
     *
     * @returns {boolean}
     */
    public isCatalogDCP1(): boolean {

        return this.catalog === DCPCatalog.DCP1;
    }

    /**
     * Handle select of catalog - dispatch event to track click on catalog, then redirect to catalog.
     */
    public onCatalogSelected(catalog: DCPCatalog) {

        this.store.dispatch(new ViewCatalogAction(catalog));
        this.window.location.href = `/explore/${EntityName.PROJECTS}?catalog=${catalog}`;
    }
}
