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
import { selectFileManifestFileSummary } from "../_ngrx/file-manifest/file-manifest.selectors";
import { FetchManifestDownloadFileSummaryRequestAction } from "../_ngrx/file-manifest/fetch-manifest-download-file-summary-request.action";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { selectSelectedSearchTerms } from "../_ngrx/search/search.selectors";
import { SearchTerm } from "../search/search-term.model";

@Component({
    templateUrl: "./hca-download-manifest-modal.component.html",
    styleUrls: ["./hca-download-manifest-modal.component.scss"]
})
export class HCADownloadManifestModalComponent implements OnDestroy, OnInit {

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
        const selectedSearchTermNames$ = this.store.pipe(
            select(selectSelectedSearchTerms),
            map((searchTerms: SearchTerm[]) => searchTerms.map(searchTerm => searchTerm.getDisplayValue()))
        );

        // Grab file summary for populating file type counts on manifest download modal
        const selectManifestDownloadFileSummary$ = this.store.pipe(select(selectFileManifestFileSummary));

        this.state$ = combineLatest(selectedSearchTermNames$, selectManifestDownloadFileSummary$).pipe(
            map((combined) => {

                return {
                    selectedSearchTermNames: combined[0],
                    fileManifestFileSummary: combined[1]
                };
            })
        );
    }
}
