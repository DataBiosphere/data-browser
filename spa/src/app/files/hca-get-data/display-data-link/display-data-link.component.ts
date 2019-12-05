/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displays resulting get data link.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "display-data-link",
    templateUrl: "./display-data-link.component.html",
    styleUrls: ["./display-data-link.component.scss"]
})
export class DisplayDataLinkComponent {

    // Inputs
    @Input() link: string;
    @Input() targetBlank: boolean;
}
