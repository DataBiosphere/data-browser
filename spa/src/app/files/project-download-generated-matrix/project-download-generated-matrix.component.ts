/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project contributor and DCP-generated matrices downloads for v2 environments.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { Project } from "../shared/project.model";

@Component({
    selector: "project-download-generated-matrix",
    templateUrl: "./project-download-generated-matrix.component.html",
    styleUrls: ["./project-download-generated-matrix.component.scss"]
})
export class ProjectDownloadGeneratedMatrixComponent {

    @Input() project: Project;
}
