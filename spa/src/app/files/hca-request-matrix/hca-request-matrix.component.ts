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

    // Inputs
    @Input() matrixEnabled = true;

    /**
     * @param {MatDialog} dialog
     */
    constructor(public dialog: MatDialog) {
    }

    /**
     * Returns string text for expression matrix button for when button is enabled/disabled.
     * @returns {string}
     */
    getExpressionButtonText(): string {

        if ( this.matrixEnabled ) {
            return "Request Expression Matrix";
        }

        return "Request Smart-seq2 Expression Matrix";
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
