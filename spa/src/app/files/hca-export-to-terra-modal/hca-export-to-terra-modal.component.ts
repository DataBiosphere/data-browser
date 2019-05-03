/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying export to Terra download modal, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ConfigService } from "../../config/config.service";
import { HCAExportToTerraModalState } from "./hca-export-to-terra-modal.state";
import { FileSummary } from "../file-summary/file-summary";
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { ExportToTerraRequestAction } from "../_ngrx/terra/export-to-terra-request.action";
import { ResetExportToTerraStatusAction } from "../_ngrx/terra/reset-export-to-terra-status.action";
import { TerraService } from "../shared/terra.service";
import { selectExportToTerra } from "../_ngrx/terra/terra.selectors";
import { ExportToTerraStatus } from "../shared/export-to-terra-status.model";
import { Subject } from "rxjs/index";
import { FileFacetTermSelectedEvent } from "../shared/file-facet-term-selected.event";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { FetchManifestDownloadFileSummaryRequestAction } from "../_ngrx/file-manifest/fetch-manifest-download-file-summary-request.action";
import { selectFileManifestFileSummary } from "../_ngrx/file-manifest/file-manifest.selectors";
import { selectSelectedSearchTerms } from "../_ngrx/search/search.selectors";

@Component({
    templateUrl: "./hca-export-to-terra-modal.component.html",
    styleUrls: ["./hca-export-to-terra-modal.component.scss"]
})
export class HCAExportToTerraModalComponent implements OnDestroy, OnInit {

    // Privates
    private ngDestroy$ = new Subject();

    // Template variables
    public hideDownload = false;
    public portalURL: string;
    public state$: Observable<HCAExportToTerraModalState>;

    /**
     *
     * @param {ConfigService} configService
     * @param {TerraService} terraService
     * @param {Store<AppState>} store
     * @param {MatDialogRef<HCAExportToTerraModalComponent>} dialogRef
     * @param {Window} window
     */
    constructor(
        private configService: ConfigService,
        private terraService: TerraService,
        private store: Store<AppState>,
        public dialogRef: MatDialogRef<HCAExportToTerraModalComponent>,
        @Inject("Window") window: Window) {

        this.store = store;
        this.portalURL = this.configService.getPortalURL();
    }

    /**
     * Return the file type summary of the specified file summaries.
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
     * Returns true if export to Terra request has been completed.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestComplete(status: ExportToTerraStatus): boolean {

        return this.terraService.isExportToTerraRequestComplete(status);
    }

    /**
     * Returns true if an error occurred during the export to Terra request.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestFailed(status: ExportToTerraStatus): boolean {

        return this.terraService.isExportToTerraRequestFailed(status);
    }

    /**
     * Returns true if export to Terra request is in progress.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestInProgress(status: ExportToTerraStatus): boolean {

        return (this.terraService.isExportToTerraRequestInitiated(status) ||
            this.terraService.isExportToTerraRequestInProgress(status));
    }

    /**
     * Returns true if export to Terra request has not yet been started.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestNotStarted(status: ExportToTerraStatus): boolean {

        return this.terraService.isExportToTerraRequestNotStarted(status);
    }

    /**
     * Dispatch action to export to Terra.
     */
    public onExportToTerra() {

        this.hideDownload = true;
        this.store.dispatch(new ExportToTerraRequestAction());
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     *  @param fileFacetSelectedEvent {FileFacetTermSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetTermSelectedEvent) {

        const facetName = fileFacetSelectedEvent.facetName;
        const termName = fileFacetSelectedEvent.termName;
        const selected = fileFacetSelectedEvent.selected;
        this.store.dispatch(new SelectFileFacetTermAction(facetName, termName, !selected));
    }

    /**
     * Open new window on completion of export to Terra request. Close dialog.
     */
    private initRequestCompleteSubscriber() {

        this.state$
            .pipe(
                takeUntil(this.ngDestroy$),
                filter(({exportToTerraStatus}) => this.isRequestComplete(exportToTerraStatus))
            )
            .subscribe((state) => {

                window.open(this.terraService.buildExportToTerraWorkspaceUrl(state.exportToTerraUrl));
                this.dialogRef.close();
            });
    }

    /**
     * Reset export to Terra request status and kill subscriptions.
     */
    public ngOnDestroy() {

        // Reset export to Terra request status
        this.store.dispatch(new ResetExportToTerraStatusAction());

        // Kill subscriptions
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // Kick off request for file summaries, ignoring any currently selected file types
        this.store.dispatch(new FetchManifestDownloadFileSummaryRequestAction());

        // Grab the current set of selected search terms
        const selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));

        // Grab file summary for populating file type counts on export to Terra modal
        const selectManifestDownloadFileSummary$ = this.store.pipe(select(selectFileManifestFileSummary));

        // Update the UI with any changes in the export to Terra request status and URL
        const selectExportToTerraStatus$ = this.store.pipe(select(selectExportToTerra));

        this.state$ = combineLatest(
            selectedSearchTerms$,
            selectManifestDownloadFileSummary$,
            selectExportToTerraStatus$
        )
            .pipe(
                map(([selectedSearchTerms, manifestDownloadFileSummary, exportToTerra]) => {

                    const selectedSearchTermNames = selectedSearchTerms
                        .map(searchTerm => searchTerm.getDisplayValue());
                    
                    return {
                        selectedSearchTerms,
                        selectedSearchTermNames,
                        manifestDownloadFileSummary,
                        ...exportToTerra
                    };
                })
        );

        this.initRequestCompleteSubscriber();
    }
}
