/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project withdrawn messaging.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "project-withdrawn",
    templateUrl: "./project-withdrawn.component.html",
    styleUrls: ["./project-withdrawn.component.scss"],
})
export class ProjectWithdrawnComponent {
    @Input() redirectUrl: string;
}
