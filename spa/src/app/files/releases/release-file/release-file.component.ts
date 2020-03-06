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
import { ReleaseFileType } from "../release-file-type.model";

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

    /**
     * Return the display view for the specifed file type.
     * 
     * @param {ReleaseFileType} fileType
     * @returns {string}
     */
    public getReleaseFileTitleDisplay(fileType: ReleaseFileType): string {
        
        return ReleaseFileType[fileType].replace("_", " ");
    }
}
