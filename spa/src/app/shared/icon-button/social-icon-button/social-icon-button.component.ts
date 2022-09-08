/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying social as icon button.
 */

// Dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "social-icon-button",
    templateUrl: "social-icon-button.component.html",
    styleUrls: ["social-icon-button.component.scss"],
})
export class SocialIconButtonComponent {
    // Inputs
    @Input() url: string;
}
