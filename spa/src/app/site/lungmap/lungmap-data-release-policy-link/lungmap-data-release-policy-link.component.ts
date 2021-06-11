/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * LungMAP-specific data release policy link.
 */

// Core dependencies
import { Component } from "@angular/core";

// App dependencies
import { DataReleasePolicyLinkComponent } from "../../site-config/data-release-policy-link.component";

@Component({
    selector: "lungmap-data-release-policy-link",
    templateUrl: "lungmap-data-release-policy-link.component.html",
    styleUrls: ["lungmap-data-release-policy-link.component.scss"]
})
export class LungMAPDataReleasePolicyLinkComponent implements DataReleasePolicyLinkComponent {}
