/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Displays Terra export modal on click on button.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy
} from "@angular/core";
import { MatDialog } from "@angular/material";

// App dependencies
import { HCAExportToTerraModalComponent } from "../hca-export-to-terra-modal/hca-export-to-terra-modal.component";

@Component({
    selector: "hca-export-to-terra",
    templateUrl: "./hca-export-to-terra.component.html",
    styleUrls: ["./hca-export-to-terra.component.scss"]
})

export class HCAExportToTerraComponent {

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

        this.dialog.open(HCAExportToTerraModalComponent, {
            backdropClass: "hca-form-backdrop",
            disableClose: false,
            panelClass: "hca-form-dialog"
        });
    }
}
