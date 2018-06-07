/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying three summary counts: files, donors, and file size.
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
import { FileFacet } from "../shared/file-facet.model";
import { FileSummary } from "../file-summary/file-summary";
import { DownloadFileManifestAction } from "../_ngrx/file-manifest-summary/file-manifest-summary.actions";
import { HCADownloadManifestModalComponent } from "../hca-download-manifest-modal/hca-download-manifest-modal.component";
import { MatDialog } from "@angular/material";

@Component({
    selector: "hca-file-summary",
    templateUrl: "./hca-file-summary.component.html",
    styleUrls: ["./hca-file-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAFileSummaryComponent {

    // Locals
    private store: Store<AppState>;

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];
    @Input() summary: FileSummary;

    /**
     * @param route {ActivatedRoute}
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>,
                public dialog: MatDialog) {
        this.store = store;
    }

    /**
     * Open dialog to download manifest summary.
     *
     */
    onDownloadManifest(): void {

        const dialogRef = this.dialog.open(HCADownloadManifestModalComponent, {
            backdropClass: "hca-form-backdrop",
            disableClose: false,
            panelClass: "hca-form-dialog",
            data: { summary: this.summary, fileFacets: this.fileFacets, selectedFacets: this.selectedFacets}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log("Case is cancelled");
                // this.isCaseCancelled(result);
            }
        });
    }
}
