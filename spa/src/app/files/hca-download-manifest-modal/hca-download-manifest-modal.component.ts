// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Inject } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { DownloadFileManifestAction } from "../_ngrx/file-manifest-summary/file-manifest-summary.actions";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileSummary } from "../file-summary/file-summary";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";

@Component({
    templateUrl: "./hca-download-manifest-modal.component.html",
    styleUrls: ["./hca-download-manifest-modal.component.scss"]
})
export class HCADownloadManifestModalComponent {

    // Privates
    private store: Store<AppState>;

    // Template variables
    facetName = "fileFormat";
    fileFacets: FileFacet[];
    hideDownload = false;
    selectedFacets: FileFacet[];
    summary: FileSummary;

    constructor(store: Store<AppState>, public dialogRef: MatDialogRef<HCADownloadManifestModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.store = store;
        this.summary = data.summary;
        this.fileFacets = data.fileFacets;
        this.selectedFacets = data.selectedFacets;
    }

    public getDownloadClass(step) {

        if ( step === 1 && this.hideDownload ) {
            return {
                hide: true
            };
        }

        if ( step === 2 && !(this.hideDownload) ) {
            return {
                hide: true
            };
        }
    }

    /**
     * Returns the facet given a facet name
     */
    public getFacet(facetName: string): FileFacet {

        const fileFacet = this.fileFacets.find(function (fileFacet) {
            return fileFacet.name === facetName;
        });

        return fileFacet;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     * Dispatch action to download manifest summary.
     */
    public onDownloadManifest() {

        this.hideDownload = true;
        this.store.dispatch(new DownloadFileManifestAction());
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Redirect to instructions on how to download manifest.
     */
    public onGetInstructions() {
        console.log("go to instructions");
    }

}
