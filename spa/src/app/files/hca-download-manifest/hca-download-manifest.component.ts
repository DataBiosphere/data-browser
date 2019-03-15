/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying three summary counts: files, donors, and file size.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy
} from "@angular/core";
import { MatDialog } from "@angular/material";

// App dependencies
import { HCADownloadManifestModalComponent } from "../hca-download-manifest-modal/hca-download-manifest-modal.component";

@Component({
    selector: "hca-download-manifest",
    templateUrl: "./hca-download-manifest.component.html",
    styleUrls: ["./hca-download-manifest.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCADownloadManifestComponent {

    /**
     * @param {MatDialog} dialog
     */
    constructor(public dialog: MatDialog) {
    }

    /**
     * Open dialog to download manifest summary.
     *
     */
    onDownloadManifest(): void {

        this.dialog.open(HCADownloadManifestModalComponent, {
            backdropClass: "hca-form-backdrop",
            disableClose: false,
            panelClass: "hca-form-dialog"
        });
    }
}
