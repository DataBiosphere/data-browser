/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying download citation.
 */

// Core dependencies
import { Component } from "@angular/core";

// App dependencies
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "data-download-citation",
    templateUrl: "./data-download-citation.component.html",
    styleUrls: ["./data-download-citation.component.scss"]
})
export class DataDownloadCitationComponent {

    // Template variables
    public portalURL: string;

    /**
     *
     * @param {ConfigService} configService
     */
    public constructor(private configService: ConfigService) {

        this.portalURL = this.configService.getPortalUrl();
    }

}
