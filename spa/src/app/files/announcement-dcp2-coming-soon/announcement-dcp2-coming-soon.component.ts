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
    selector: "announcement-dcp2-coming-soon",
    templateUrl: "./announcement-dcp2-coming-soon.component.html",
    styleUrls: ["./announcement-dcp2-coming-soon.component.scss"]
})
export class AnnouncementDCP2ComingSoonComponent {

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
