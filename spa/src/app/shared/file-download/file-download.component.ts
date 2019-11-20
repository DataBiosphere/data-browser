/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get data panel component.
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { FileDownloadLink } from "./file-download.model";

@Component({
    selector: "file-download",
    templateUrl: "./file-download.component.html",
    styleUrls: ["./file-download.component.scss"]
})
export class FileDownloadComponent {

    // Inputs
    @Input() link: FileDownloadLink;
    @Input() hideCopyToClipboard: boolean;
}
