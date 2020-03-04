/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying the release file download.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "release-file-download",
    templateUrl: "./release-file-download.component.html",
    styleUrls: ["./release-file-download.component.scss"]
})
export class ReleaseFileDownloadComponent {

    // Inputs
    @Input() releaseFiles: string[]; /* TODO Mim - change type */

    /**
     * Click event for download of file. TODO Mim
     *
     */
    public onDownloadFile() {

        // Insert
        console.log("Download");
    }
}
