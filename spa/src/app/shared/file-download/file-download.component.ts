/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get data panel component.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FileDownloadLink } from "./file-download.model";

@Component({
    selector: "file-download",
    templateUrl: "./file-download.component.html",
    styleUrls: ["./file-download.component.scss"],
})
export class FileDownloadComponent {
    // Inputs/outputs
    @Input() link: FileDownloadLink;
    @Input() hideCopyToClipboard: boolean;
    @Output() linkClicked = new EventEmitter<FileDownloadLink>();
    @Output() linkCopiedToClipboard = new EventEmitter<FileDownloadLink>();

    /**
     * Let parent components know download link has been clicked.
     *
     * @param {FileDownloadLink} link
     */
    public onLinkClicked(link: FileDownloadLink) {
        this.linkClicked.emit(link);
    }

    /**
     * Let parent components know download link has been copied to clipboard.
     *
     * @param {FileDownloadLink} url
     */
    public onLinkCopiedToClipboard(link: FileDownloadLink) {
        this.linkCopiedToClipboard.emit(link);
    }
}
