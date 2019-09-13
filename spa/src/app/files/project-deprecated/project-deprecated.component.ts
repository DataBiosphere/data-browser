/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying deprecated project messaging, and link to corresponding updated project.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "project-deprecated",
    templateUrl: "./project-deprecated.component.html",
    styleUrls: ["./project-deprecated.component.scss"]
})
export class ProjectDeprecatedComponent {

    @Input() updatedProjectId: string;
}
