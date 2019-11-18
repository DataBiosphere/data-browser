/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get data panel component.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "file-download",
    templateUrl: "./file-download.component.html",
    styleUrls: ["./file-download.component.scss"]
})
export class FileDownloadComponent {

    // Inputs
    @Input() url: string;
    @Input() label: string;
    @Input() hideCopyToClipboard: boolean;
}
