/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared expression matrices downloads inside modal. The modal closes automatically
 * on NavigationStart event. The follow actions causes a redirect to the projects page (and therefore closes the modal):
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
import { ModalClosedAction } from "../../../modal/_ngrx/modal-closed.action";
import { ModalOpenedAction } from "../../../modal/_ngrx/modal-opened.action";
import { AppState } from "../../../_ngrx/app.state";
import { LibraryConstructionApproach } from "../../shared/library-construction-approach.model";
import { selectDataset } from "../../_ngrx/release/release.selectors";
import { FetchProjectRequestAction } from "../../_ngrx/table/table.actions";
import { ReleaseDataset } from "../release-dataset.model";
import { ReleaseName } from "../release-name.model";
import { DevelopmentalStage } from "../2020-march/developmental-stage.model";
import { ReleaseFilesModalState } from "./release-files-modal.state";

@Component({
    selector: "release-files-modal",
    templateUrl: "./release-files-modal.component.html",
    styleUrls: ["./release-files-modal.component.scss"]
})
export class ReleaseFilesModalComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();
    /* TODO Mim */
    private state$ = new BehaviorSubject<ReleaseFilesModalState>({
        loaded: false,
        releaseDataset: {
            entryId: "",
            projectShortname: "",
            projectData: {
                entryId: "",
                datasetId: "",
                developmentalStage: DevelopmentalStage.ADULT,
                libraryConstructionApproach: LibraryConstructionApproach.INDROP,
                projectShortname: ""}}
    });

    /**
     * @param {Store<AppState>} store
     * @param {MatDialogRef<ProjectDownloadMatrixModalComponent>} dialogRef
     * @param data
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

    /**
     * Close the modal on any navigation event.
     */
    private initCloseOnNavigation() {

        /* TODO Mim - keep ? */
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
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the prepared matrix URLs for the selected project. Also listen for navigation events, in which case we must
     * close the modal.
     */
    public ngOnInit(): void {
        
        this.initCloseOnNavigation();
        
        const projectId = this.data.projectId;
        const datasetId = this.data.datasetId;

        // Request project details so we can display the project title
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        /* TODO Mim */
        this.store.pipe(
            select(selectDataset, {name: ReleaseName.RELEASE_2020_MAR, projectId: projectId, datasetId: datasetId}),
            // filter(release => !!release),
            // map(release => release),
            takeUntil(this.ngDestroy$)
        ).subscribe((releaseDataset: ReleaseDataset) => {
            this.state$.next({
                loaded: true,
                releaseDataset: releaseDataset
            });
        });
    }
}
