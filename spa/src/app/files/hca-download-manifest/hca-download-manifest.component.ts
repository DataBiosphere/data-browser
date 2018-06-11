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
import { HCADownloadManifestModalComponent } from "../hca-download-manifest-modal/hca-download-manifest-modal.component";
import { MatDialog } from "@angular/material";

@Component({
    selector: "hca-download-manifest",
    templateUrl: "./hca-download-manifest.component.html",
    styleUrls: ["./hca-download-manifest.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCADownloadManifestComponent {

    // Locals
    private store: Store<AppState>;

    // Inputs
    @Input() downloadActive: boolean;
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
            data: {summary: this.summary, fileFacets: this.fileFacets, selectedFacets: this.selectedFacets}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
