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
    selector: "data-use-notification",
    templateUrl: "./data-use-notification.component.html",
    styleUrls: ["./data-use-notification.component.scss"]
})
export class DataUseNotificationComponent {

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
