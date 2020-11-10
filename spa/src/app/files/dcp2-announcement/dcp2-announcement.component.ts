/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying DCP2 announcement banner.
 */

// Core dependencies
import { Component } from "@angular/core";

// App dependencies
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "dcp2-announcement",
    templateUrl: "./dcp2-announcement.component.html",
    styleUrls: ["./dcp2-announcement.component.scss"]
})
export class DCP2AnnouncementComponent {

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {}

    /**
     * Returns the URL to the DCP2 announcement page.
     */
    public getDCP2AnnouncementUrl(): string {

        return `${this.configService.getPortalUrl()}/coming-soon-DCP-2-with-support-for-controlled-access-data`;
    }
}
