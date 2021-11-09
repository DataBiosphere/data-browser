/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying project matrix archive files in tabular format.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ArchivePreview } from "../project-matrix/archive-preview.model";

@Component({
    selector: "project-matrix-archive-preview",
    templateUrl: "./project-matrix-archive-preview.component.html",
    styleUrls: ["./project-matrix-archive-preview.component.scss"]
})
export class ProjectMatrixArchivePreviewComponent {
    
    // Inputs/Outputs
    @Input() archivePreview: ArchivePreview;
}
