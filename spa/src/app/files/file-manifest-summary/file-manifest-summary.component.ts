// Core dependencies
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

// App dependencies
import { FileManifestSummary } from "./file-manifest-summary";

/**
 * Component for managing manifest summary download options. Emits downloadManifest event on click of download
 * button.
 */
@Component({
    selector: "bw-file-manifest-summary",
    templateUrl: "./file-manifest-summary.component.html",
    styleUrls: ["./file-manifest-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManifestSummaryComponent {

    // Inputs
    @Input() manifestSummary: FileManifestSummary[];

    // Outputs
    @Output() downloadManifest = new EventEmitter<void>();

    /**
     * Public API
     */

    /**
     * Download manifest.
     */
    onClickDownloadManifest(): void {

        this.downloadManifest.emit();
    }
}
