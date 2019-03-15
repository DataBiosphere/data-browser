/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Core footer component, displays HCA-related links and copyright.
 */
// Core dependencies
import { Component } from "@angular/core";
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "hca-footer",
    templateUrl: "hca-footer.component.html",
    styleUrls: ["hca-footer.component.scss"]
})

export class HCAFooterComponent {

    portalURL: string;

    constructor(private configService: ConfigService) {
        this.portalURL = this.configService.getPortalURL();
    }

}
