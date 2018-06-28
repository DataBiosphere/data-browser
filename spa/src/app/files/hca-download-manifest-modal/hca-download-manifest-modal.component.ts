// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { DownloadFileManifestAction } from "../_ngrx/file-manifest-summary/file-manifest-summary.actions";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileSummary } from "../file-summary/file-summary";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { Observable } from "rxjs/Observable";
import { selectFileFacetsFileFacets, selectFileSummary } from "../_ngrx/file.selectors";

@Component({
    templateUrl: "./hca-download-manifest-modal.component.html",
    styleUrls: ["./hca-download-manifest-modal.component.scss"]
})
export class HCADownloadManifestModalComponent implements OnInit {

    // Privates
    public selectFileSummary$: Observable<FileSummary>;
    public fileFacets$: Observable<FileFacet[]>;
    private store: Store<AppState>;

    // Template variables
    hideDownload = false;

    constructor(store: Store<AppState>, public dialogRef: MatDialogRef<HCADownloadManifestModalComponent>) {
        this.store = store;
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

        this.store.dispatch(new SelectFileFacetAction(
            new FileFacetSelectedEvent(fileFacetSelectedEvent.facetName, fileFacetSelectedEvent.termName, true)));
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // File Summary
        this.selectFileSummary$ = this.store.select(selectFileSummary);

        // File Facets
        this.fileFacets$ = this.store.select(selectFileFacetsFileFacets);
    }
}
