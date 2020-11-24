/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying download icon, including available/unavailable states. This is a simple button-like
 * component that on click, lets parent components know that a download has been requested. The intended use of this
 * component is in the data tables, where a modal can be launched (by parent components) on click of this download icon.
 */

// Core dependencies
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "download-button",
    templateUrl: "./download-button.component.html",
    styleUrls: ["./download-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadButtonComponent {

    // Inputs
    @Input() disabled: boolean;
    @Input() downloadAvailable: boolean;
    @Output() downloadClicked = new EventEmitter<boolean>();

    /**
     * Let parents know download button has been clicked.
     */
    public onDownloadClicked() {

        this.downloadClicked.emit(true);
    }
}
