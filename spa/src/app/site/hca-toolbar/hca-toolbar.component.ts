/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Core toolbar component for HCA instance, displays HCA logo and HCA-related menu items.
 */
// Core dependencies
import { Component, EventEmitter, Output } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";

@Component({
    selector: "hca-toolbar",
    templateUrl: "hca-toolbar.component.html",
    styleUrls: ["hca-toolbar.component.scss"]
})

export class HCAToolbarComponent {

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();

    // Locals
    rootUrl: string;
    portalURL: string;

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     */
    constructor(private store: Store<AppState>,
                private configService: ConfigService) {

        this.rootUrl = this.configService.getDataURL();
        this.portalURL = this.configService.getPortalURL();
    }

    /**
     * Public API
     */

    /**
     * Event emitted when mobile navigation menu is open - to prevent body scroll.
     */
    public isMenuOpen(value) {
        this.menuOpen.emit(value);
    }
}
