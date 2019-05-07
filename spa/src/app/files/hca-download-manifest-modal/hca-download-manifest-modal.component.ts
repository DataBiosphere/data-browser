/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying manifest download modal, and handling the corresponding functionality.
 */

// Core dependencies
import { MatDialogRef } from "@angular/material";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { FileFacetTermSelectedEvent } from "../shared/file-facet-term-selected.event";
import { FileSummary } from "../file-summary/file-summary";
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { HCADownloadManifestModalState } from "./hca-download-manifest-modal.state";
import { AppState } from "../../_ngrx/app.state";
import { ClearManifestDownloadFileSummaryAction } from "../_ngrx/file-manifest/clear-manifest-download-file-summary.action";
import { DownloadFileManifestAction } from "../_ngrx/file-manifest/download-file-manifest.action";
import {
    selectFileManifestFileSummary, selectFileManifestManifestResponse
} from "../_ngrx/file-manifest/file-manifest.selectors";
import { FetchManifestDownloadFileSummaryRequestAction } from "../_ngrx/file-manifest/fetch-manifest-download-file-summary-request.action";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { selectSelectedSearchTerms } from "../_ngrx/search/search.selectors";
import { ManifestResponse } from "../shared/manifest-response.model";
import { ManifestStatus } from "../shared/manifest-status.model";

@Component({
    templateUrl: "./hca-download-manifest-modal.component.html",
    styleUrls: ["./hca-download-manifest-modal.component.scss"]
})
export class HCADownloadManifestModalComponent implements OnDestroy, OnInit {

    // Template variables
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
        private store: Store<AppState>,
        public dialogRef: MatDialogRef<HCADownloadManifestModalComponent>) {

        this.portalURL = this.configService.getPortalURL();
    }

    /**
     * Close the dialog on click of view instructions.
     */
    public closeDialog() {

        this.dialogRef.close();
    }

    /**
     * Return the file type summary of the specified file summary.
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
     * Return the curl command to download the manifest.
     *
     * @param {ManifestResponse} manifestResponse
     * @returns {string}
     */
    public getManifestCurlCommand(response: ManifestResponse): string {

        const link = response.fileUrl;
        const fileName = link.split("/").pop();
        return `curl ${link} --output ${fileName}`;
    }

    /**
     * Returns true if there no file type summaries.
     */
    public isFileTypeSummariesEmpty(fileSummary: FileSummary): boolean {

        return this.getFileTypeSummaries(fileSummary).length === 0; 
    }

    /**
     * Returns true if download has completed.
     *
     * @param {ManifestResponse} manifestResponse
     * @returns {boolean}
     */
    public isDownloadComplete(manifestResponse: ManifestResponse): boolean {

        return manifestResponse.status === ManifestStatus.COMPLETE;
    }

    /**
     * Returns true if download has been initiated but is not yet complete.
     *
     * @param {ManifestResponse} manifestResponse
     * @returns {boolean}
     */
    public isDownloadInProgress(manifestResponse: ManifestResponse): boolean {

        return manifestResponse.status === ManifestStatus.IN_PROGRESS;
    }

    /**
     * Returns true if download has not yet been initiated.
     * 
     * @param {ManifestResponse} manifestResponse
     * @returns {boolean}
     */
    public isDownloadNotStarted(manifestResponse: ManifestResponse): boolean {

        return manifestResponse.status === ManifestStatus.NOT_STARTED;
    }

    /**
     * Open manifest in new tab.
     * 
     * @param {ManifestResponse} manifestResponse
     */
    public onDownloadManifest(manifestResponse: ManifestResponse) {

        window.location.href = manifestResponse.fileUrl;
    }

    /**
     * Dispatch action to generate manifest summary URL.
     */
    public onRequestManifest() {

        this.store.dispatch(new DownloadFileManifestAction());
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetTermSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetTermSelectedEvent) {

        const facetName = fileFacetSelectedEvent.facetName;
        const termName = fileFacetSelectedEvent.termName;
        const selected = fileFacetSelectedEvent.selected;
        this.store.dispatch(new SelectFileFacetTermAction(facetName, termName, !selected));
    }

    /**
     *
     */
    public onNoClick(): void {

        this.dialogRef.close();
    }

    /**
     * Clear summary on close of modal. 
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearManifestDownloadFileSummaryAction());
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // Kick off request for file summaries, ignoring any currently selected file types
        this.store.dispatch(new FetchManifestDownloadFileSummaryRequestAction());

        // Grab the current set of selected search terms
        const selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));

        // Grab file summary for populating file type counts on manifest download modal
        const selectManifestDownloadFileSummary$ = this.store.pipe(select(selectFileManifestFileSummary));

        // Update the UI with any changes in the download request request status and URL
        const selectFileManifestManifestResponse$ = this.store.pipe(select(selectFileManifestManifestResponse));

        this.state$ = combineLatest(
            selectedSearchTerms$,
            selectManifestDownloadFileSummary$,
            selectFileManifestManifestResponse$
        ).pipe(
            map(([selectedSearchTerms, fileManifestFileSummary, manifestResponse]) => {

                const selectedSearchTermNames = selectedSearchTerms
                    .map(searchTerm => searchTerm.getDisplayValue());

                return {
                    selectedSearchTermNames: selectedSearchTermNames,
                    selectedSearchTerms,
                    fileManifestFileSummary,
                    manifestResponse
                };
            })
        );
    }
}
