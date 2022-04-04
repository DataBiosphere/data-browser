/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for the "learn more" link.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "learn-more",
    templateUrl: "learn-more.component.html",
    styleUrls: ["learn-more.component.scss"],
})
export class LearnMoreComponent {
    // Inputs
    @Input() learnMoreLink: string;
    @Input() targetBlank: boolean;
}
