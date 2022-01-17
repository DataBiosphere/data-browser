/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying toolbar social inside a toolbar.
 */

// Dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "toolbar-social",
    templateUrl: "toolbar-social.component.html",
    styleUrls: ["toolbar-social.component.scss"]
})

export class ToolbarSocialComponent {
    // Inputs
    @Input() imgSrc: string;
    @Input() name: string;
    @Input() url: string;
}
