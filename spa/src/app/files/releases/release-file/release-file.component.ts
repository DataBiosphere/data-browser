/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying the release file.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ReleaseFilesView } from "../release-files-view.model";

@Component({
    selector: "release-file",
    templateUrl: "./release-file.component.html",
    styleUrls: ["./release-file.component.scss"]
})
export class ReleaseFileComponent {

    // Inputs
    @Input() releaseFiles: ReleaseFilesView[];
    @Input() releaseFileParagraph: string;
    @Input() releaseFileTitle: string;
}
