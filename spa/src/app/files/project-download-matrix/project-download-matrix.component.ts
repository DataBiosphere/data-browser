/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared expression matrices downloads. Contains description of download, and the
 * set of matrix downloads for each species, for the given project.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

@Component({
    selector: "project-download-matrix",
    templateUrl: "./project-download-matrix.component.html",
    styleUrls: ["./project-download-matrix.component.scss"],
    host: {"class": "project-download-matrix"} // Required for copy to clipboard CSS
})
export class ProjectDownloadMatrixComponent {

    @Input() projectMatrixUrls: ProjectMatrixUrls;
}
