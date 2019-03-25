/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying export to Terra download modal, and handling the corresponding functionality.
 */

// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
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
import { HCAExportToTerraModalState } from "./hca-export-to-terra-modal.state";
import {
    FetchManifestDownloadFileSummaryRequestAction
} from "../_ngrx/file-summary/file-summary.actions";
import { FileSummary } from "../file-summary/file-summary";
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { ExportToTerraRequestAction } from "../_ngrx/terra/export-to-terra-request.action";
import { ResetExportToTerraStatusAction } from "../_ngrx/terra/reset-export-to-terra-status.actions";
import { TerraService } from "../shared/terra.service";
import { selectExportToTerraStatus, selectExportToTerraUrl } from "../_ngrx/terra/terra.selectors";
import { ExportToTerraStatus } from "../shared/export-to-terra-status.model";
import { Subject } from "rxjs/index";

@Component({
    templateUrl: "./hca-export-to-terra-modal.component.html",
    styleUrls: ["./hca-export-to-terra-modal.component.scss"]
})
export class HCAExportToTerraModalComponent implements OnDestroy, OnInit {

    // Privates
    private ngDestroy$ = new Subject();
    private store: Store<AppState>;

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
     */
    constructor(
        private configService: ConfigService,
        private terraService: TerraService,
        store: Store<AppState>,
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
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(
            new FileFacetSelectedEvent(fileFacetSelectedEvent.facetName, fileFacetSelectedEvent.termName, true)));
    }

    /**
     * Open new window on completion of export to Terra request. Close dialog.
     */
    private initRequestCompleteSubscriber() {

        this.state$
            .pipe(
                takeUntil(this.ngDestroy$),
                filter(({exportToTerraStatus}) => this.isRequestComplete(exportToTerraStatus)),
                take(1)
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

        // Grab the current set of file facets
        const selectedFileFacets$ = this.store.pipe(select(selectFileFacetsFileFacets));

        // Grab file summary for populating file type counts on export to Terra modal
        const selectManifestDownloadFileSummary$ = this.store.pipe(select(selectDownloadManifestFileSummary));

        // Update the UI with any changes in the export to Terra request status
        const selectExportToTerraStatus$ = this.store.pipe(select(selectExportToTerraStatus));

        // Grab the export URL
        const selectExportToTerraUrl$ = this.store.pipe(select(selectExportToTerraUrl));

        this.state$ = combineLatest(
            selectedFileFacets$,
            selectManifestDownloadFileSummary$,
            selectExportToTerraStatus$,
            selectExportToTerraUrl$
        )
            .pipe(
                map(([selectedFileFacets, manifestDownloadFileSummary, exportToTerraStatus, exportToTerraUrl]) => {

                    return {
                        selectedFileFacets,
                        manifestDownloadFileSummary,
                        exportToTerraStatus,
                        exportToTerraUrl
                    };
                })
        );

        this.initRequestCompleteSubscriber();
    }
}
