import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FileManifestSummary } from "./file-manifest-summary";

@Component({
    selector: "bw-file-manifest-summary",
    templateUrl: "./file-manifest-summary.component.html",
    styleUrls: ["./file-manifest-summary.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManifestSummaryComponent {

    @Input() manifestSummary: FileManifestSummary[];

    @Output() downloadManifest = new EventEmitter<void>();

    requestDownloadManifest(): void {
        this.downloadManifest.emit();
    }
}
