/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying data normalization warning on download pages.
 */

// Core dependencies
import { Component } from "@angular/core";

// App dependencies
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "warning-data-normalization",
    templateUrl: "./warning-data-normalization.component.html",
    styleUrls: ["./warning-data-normalization.component.scss"]
})
export class WarningDataNormalizationComponent {

    // Template variables
    portalUrl;

    /**
     * @param configService
     */
    constructor(private configService: ConfigService) {
        this.portalUrl = configService.getPortalUrl();
    }
}
