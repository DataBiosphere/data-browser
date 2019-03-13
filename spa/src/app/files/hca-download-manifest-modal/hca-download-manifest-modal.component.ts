/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying manifest download modal, and handling the corresponding functionality.
 */

// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { DownloadFileManifestAction } from "../_ngrx/file-manifest-summary/file-manifest-summary.actions";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { MatDialogRef } from "@angular/material";
import {
    SelectFileFacetAction
} from "../_ngrx/file-facet-list/file-facet-list.actions";
import { Observable } from "rxjs";
import {
    selectFileFacetsFileFacets,
    selectDownloadManifestFileSummary
} from "../_ngrx/file.selectors";
import { HCADownloadManifestModalState } from "./hca-download-manifest-modal.state";
import {
    FetchManifestDownloadFileSummaryRequestAction
} from "../_ngrx/file-summary/file-summary.actions";
import { FileSummary } from "../file-summary/file-summary";
import { FileTypeSummary } from "../file-summary/file-type-summary";

@Component({
    templateUrl: "./hca-download-manifest-modal.component.html",
    styleUrls: ["./hca-download-manifest-modal.component.scss"]
})
export class HCADownloadManifestModalComponent implements OnInit {

    // Privates
    private store: Store<AppState>;

    // Template variables
    public hideDownload = false;
    public portalURL: string;
    public state$: Observable<HCADownloadManifestModalState>;

    /**
     *
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {MatDialogRef<HCADownloadManifestModalComponent>} dialogRef
     */
    constructor(
        private configService: ConfigService,
        store: Store<AppState>,
        public dialogRef: MatDialogRef<HCADownloadManifestModalComponent>) {

        this.store = store;
        this.portalURL = this.configService.getPortalURL();
    }

    /**
     * Close the dialog on click of view instructions.
     */
    public closeDialog() {

        this.dialogRef.close();
    }

    /**
     *
     */
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
     * Return the file type summary of the specifiled file summaries.
     *
     * @param {FileSummary} fileSummary
     * @returns {FileTypeSummary[]}
     */
    public getFileTypeSummaries(fileSummary: FileSummary): FileTypeSummary[] {

        if ( fileSummary ) {
            return fileSummary.fileTypeSummaries;
        }

        return [];
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
     *
     */
    public onNoClick(): void {

        this.dialogRef.close();
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // Kick off request for file summaries, ignoring any currently selected file types
        this.store.dispatch(new FetchManifestDownloadFileSummaryRequestAction());

        // Grab the current set of file facets
        const selectedFileFacets$ = this.store.pipe(select(selectFileFacetsFileFacets));

        // Grab file summary for populating file type counts on manifest downlaod modal
        const selectManifestDownloadFileSummary$ = this.store.pipe(select(selectDownloadManifestFileSummary));

        this.state$ = combineLatest(selectedFileFacets$, selectManifestDownloadFileSummary$).pipe(
            map((combined) => {

                return {
                    selectedFileFacets: combined[0],
                    manifestDownloadFileSummary: combined[1]
                };
            })
        );
    }
}
