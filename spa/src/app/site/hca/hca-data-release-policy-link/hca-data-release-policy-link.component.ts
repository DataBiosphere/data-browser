/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA-specific data release policy link.
 */

// Core dependencies
import { Component } from "@angular/core";
import { DataReleasePolicyLinkComponent } from "../../site-config/data-release-policy-link.component";

// App dependencies

@Component({
    selector: "hca-data-release-policy-link",
    templateUrl: "hca-data-release-policy-link.component.html",
    styleUrls: ["hca-data-release-policy-link.component.scss"]
})
export class HCADataReleasePolicyLinkComponent implements DataReleasePolicyLinkComponent {}
