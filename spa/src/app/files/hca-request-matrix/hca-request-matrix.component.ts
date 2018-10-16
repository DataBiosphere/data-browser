/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Top-level component handling Matrix request-related functionality.
 */

// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy
} from "@angular/core";
import { AppState } from "../../_ngrx/app.state";
import { Store } from "@ngrx/store";

// App dependencies
import { HCARequestMatrixModalComponent } from "../hca-request-matrix-modal/hca-request-matrix-modal.component";
import { MatDialog } from "@angular/material";

@Component({
    selector: "hca-request-matrix",
    templateUrl: "./hca-request-matrix.component.html",
    styleUrls: ["./hca-request-matrix.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCARequestMatrixComponent {

    /**
     * @param {MatDialog} dialog
     */
    constructor(public dialog: MatDialog) {
    }

    /**
     * Open dialog to request matrix summary.
     */
    onRequestMatrix(): void {

        const dialogRef = this.dialog.open(HCARequestMatrixModalComponent, {
            backdropClass: "hca-form-backdrop",
            disableClose: false,
            panelClass: "hca-form-dialog"
        });
    }
}
