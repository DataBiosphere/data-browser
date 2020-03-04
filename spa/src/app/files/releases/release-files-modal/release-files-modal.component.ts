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
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { Release } from "../2020-march/release.model";
import { ReleaseDataset } from "../2020-march/release-dataset.model";
import { ReleaseProject } from "../2020-march/release-project.model";
import { AppState } from "../../../_ngrx/app.state";
import { ModalClosedAction } from "../../../modal/_ngrx/modal-closed.action";
import { ModalOpenedAction } from "../../../modal/_ngrx/modal-opened.action";
import { ClearReleaseReferrerAction } from "../../_ngrx/release/clear-release-referrer.action";
import { selectReleaseByDataset } from "../../_ngrx/release/release.selectors";
import { ReleaseFilesModalState } from "./release-files-modal.state";
import { ReleaseName } from "../release-name.model";
import { FetchProjectRequestAction } from "../../_ngrx/table/table.actions";

@Component({
    selector: "release-files-modal",
    templateUrl: "./release-files-modal.component.html",
    styleUrls: ["./release-files-modal.component.scss"]
})
export class ReleaseFilesModalComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();
    private state$ = new BehaviorSubject<ReleaseFilesModalState>({
        loaded: false
    });

    /**
     * @param {Store<AppState>} store
     * @param {MatDialogRef<ProjectDownloadMatrixModalComponent>} dialogRef
     * @param {any} data
     * @param {Router} router
     */
    constructor(
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<ReleaseFilesModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private router: Router) {

        this.store.dispatch(new ModalOpenedAction());
    }

    /**
     * Redirect to projects list - called from template on click of close icon, or on keyup or escape key. The resulting
     * navigation event causes the modal to close. See initCloseOnNavigation.
     */
    @HostListener("window:keyup.esc")
    public redirectToReleases(): void {

        this.router.navigateByUrl(`/releases/2020-mar`, {replaceUrl: true});
    }

    public getFileDownloadParagraph() {

        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at commodo diam, vel iaculis elit."
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

        this.store.dispatch(new ClearReleaseReferrerAction());
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

        this.store.pipe(
            select(selectReleaseByDataset, {
                name: ReleaseName.RELEASE_2020_MAR,
                projectId: projectId,
                datasetId: datasetId
            }),
            filter(release => !!release),
            takeUntil(this.ngDestroy$)
        ).subscribe((release: Release) => {
            
            const releaseProject = release.projects[0] || {} as ReleaseProject;
            this.state$.next({
                loaded: true,
                releaseDataset: releaseProject ? releaseProject.datasets[0] : {} as ReleaseDataset,
                releaseProject
            });
        });
    }
}
