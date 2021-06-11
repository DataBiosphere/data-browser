/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying download citation.
 */

// Core dependencies
import { Component } from "@angular/core";

// App dependencies
import { ConfigService } from "../../../config/config.service";

@Component({
    selector: "lungmap-data-use-notification",
    templateUrl: "./lungmap-data-use-notification.component.html",
    styleUrls: ["./lungmap-data-use-notification.component.scss"]
})
export class LungMAPDataUseNotificationComponent {

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
