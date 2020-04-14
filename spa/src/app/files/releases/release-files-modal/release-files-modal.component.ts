/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying release files for a selected dataset. The modal closes automatically on NavigationStart
 * event. The following actions triggers a navigation event (and therefore closes the modal):
 * 
 * 1. Hitting escape
 * 2. Clicking the close icon
 * 3. Clicking the HCA logo
 */

// Core dependencies
import { Component, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NavigationStart, Router, RouterEvent } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { AppState } from "../../../_ngrx/app.state";
import { ModalClosedAction } from "../../../modal/_ngrx/modal-closed.action";
import { ModalOpenedAction } from "../../../modal/_ngrx/modal-opened.action";
import {
    selectReleaseByDataset,
    selectReleaseByProjectId,
    selectReleaseFilesReferrer
} from "../../_ngrx/release/release.selectors";
import { ClearReleaseFilesReferrerAction } from "../../_ngrx/release/clear-release-files-referrer.action";
import { SetReleaseReferrerAction } from "../../_ngrx/release/set-release-referrer.action";
import { FetchProjectRequestAction } from "../../_ngrx/table/table.actions";
import { ReleaseDatasetView } from "../release-dataset-view.model";
import { ReleaseFilesModalState } from "./release-files-modal.state";
import { Release } from "../release.model";
import { ReleaseName } from "../release-name.model";
import { ReleaseFileView } from "../release-file-view.model";
import { GTMService } from "../../../shared/gtm/gtm.service";
import { GACategory } from "../../../shared/gtm/ga-category.model";
import { GADimension } from "../../../shared/gtm/ga-dimension.model";
import { GAAction } from "../../../shared/gtm/ga-action.model";
import { ReleaseService } from "../../shared/release.service";

@Component({
    selector: "release-files-modal",
    templateUrl: "./release-files-modal.component.html",
    styleUrls: ["./release-files-modal.component.scss"]
})
export class ReleaseFilesModalComponent implements OnDestroy, OnInit {

    // Locals
    private columnsToDisplay = ["download", "description", "copyLink"];
    private ngDestroy$ = new Subject();
    private releaseFilesReferrer: boolean;
    private state$ = new BehaviorSubject<ReleaseFilesModalState>({
        loaded: false
    });

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     * @param {GTMService} gtmService
     * @param {ReleaseService} releaseService
     * @param {MatDialogRef<ProjectDownloadMatrixModalComponent>} dialogRef
     * @param {any} data
     * @param {Router} router
     */
    constructor(
        private store: Store<AppState>,
        private configService: ConfigService,
        private gtmService: GTMService,
        private releaseService: ReleaseService,
        private dialogRef: MatDialogRef<ReleaseFilesModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private router: Router) {

        this.store.dispatch(new ModalOpenedAction());
    }

    /**
     * Returns the full release file URL.
     *
     * @param {string} url
     */
    public getReleaseFileUrl(url: string): string {

        return  `${this.configService.getProjectMetaURL()}/release-files/releases/2020-mar/${url}`;
    }

    /**
     * Redirect to projects list - called from template on click of close icon, or on keyup or escape key. The resulting
     * navigation event causes the modal to close. See initCloseOnNavigation.
     */
    @HostListener("window:keyup.esc")
    public redirectToReleases(): void {

        this.state$.pipe(
            take(1)
        ).subscribe(state => {

            let url;
            if ( state.releaseFilesReferrer ) {
                url = "/releases/2020-mar";
            }
            else {
                url = `/projects/${state.releaseDataset.entryId}/releases/2020-mar`;
            }
            this.router.navigateByUrl(url, {replaceUrl: true});
        });
    }

    /**
     * Update state to indicate that the back button the project detail page should navigate back to the release page,
     * and not the project tab.
     */
    public setReleaseReferrer() {

        this.store.dispatch(new SetReleaseReferrerAction());
    }

    /**
     * Track download of release file.
     * 
     * @param {string} projectShortname
     * @param {ReleaseFileView} releaseFile
     */
    public trackDownload(releaseDatasetView: ReleaseDatasetView, releaseFile: ReleaseFileView): void {

        this.gtmService.trackEvent(GACategory.DATASET, GAAction.DOWNLOAD, releaseDatasetView.datasetId, {
            [GADimension.ENTITY_URL]: this.getReleaseFileUrl(releaseFile.url),
            [GADimension.FILE_TYPE]: releaseFile.type,
            [GADimension.FILE_EXTENSION]: releaseFile.extension,
            [GADimension.FILE_NAME]: releaseFile.url,
            [GADimension.RELEASE_NAME]: ReleaseName.RELEASE_2020_MAR
        });
    }

    /**
     * Create model of dataset to back modal. The specified release is expected to have a single project containing a
     * single dataset; the dataset we want to display.
     *
     * @param {Release} release
     * @returns {ReleaseDatasetView}
     */
    private createReleaseDatasetView(release: Release): ReleaseDatasetView {

        const releaseProject = release.projects[0];
        if ( !releaseProject ) {
            return {} as ReleaseDatasetView;
        }

        const releaseDataset = releaseProject.datasets[0];
        if ( !releaseDataset ) {
            return {} as ReleaseDatasetView;
        }

        const projectId = releaseProject.entryId;
        const projectTitle = releaseProject.projectShortname;
        return this.releaseService.createReleaseDatasetView(projectId, projectTitle, releaseDataset);
    }

    /**
     * Returns true if there is only a single dataset for the selected project
     *
     * @param {Release} release
     */
    private isOnlyProjectDataset(release: Release): boolean {

        const releaseProject = release.projects[0];
        if ( !releaseProject ) {
            return true; // Error
        }

        const datasets = releaseProject.datasets || [];
        if ( datasets.length === 0 ) {
            return true; // Error
        }
        
        return datasets.length === 1;
    }

    /**
     * Close the modal on any navigation event.
     */
    private initCloseOnNavigation() {

        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationStart),
            filter(() => !!this.dialogRef),
            takeUntil(this.ngDestroy$)
        ).subscribe(() => {
            this.store.dispatch(new ModalClosedAction());
            this.dialogRef.close();
        });
    }

    /**
     * Kill subscriptions on destroy of component.  Also clear the flag indicating this project modal component
     * should return the release page (if necessary).
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearReleaseFilesReferrerAction());
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the dataset data from the store. Also listen for navigation events, in which case we must close the modal.
     */
    public ngOnInit(): void {

        this.initCloseOnNavigation();

        const projectId = this.data.projectId;
        const datasetId = this.data.datasetId;

        // Request project details so we can display the project title
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab the selected project in the selected release - this is used to determine if the "other datasets" warning
        // is displayed
        const releaseByProjectId$ = this.store.pipe(
            select(selectReleaseByProjectId, {
                name: ReleaseName.RELEASE_2020_MAR,
                projectId: projectId,
            })
        );
        
        // Grab the dataset from the store for selected project in the selected release
        const dataset$ = this.store.pipe(
            select(selectReleaseByDataset, {
                name: ReleaseName.RELEASE_2020_MAR,
                projectId: projectId,
                datasetId: datasetId
            }),
            filter(release => !!release)
        );

        const releaseFilesReferrer$ = this.store.pipe(
            select(selectReleaseFilesReferrer)
        );

        combineLatest(releaseByProjectId$, dataset$, releaseFilesReferrer$).pipe(
            takeUntil(this.ngDestroy$)
        ).subscribe(([fullRelease, datasetRelease, releaseFilesReferrer]) => {

            this.state$.next({
                loaded: true,
                releaseFilesReferrer,
                releaseDataset: this.createReleaseDatasetView(datasetRelease),
                singleDataset: this.isOnlyProjectDataset(fullRelease)
            });
        });
    }
}
