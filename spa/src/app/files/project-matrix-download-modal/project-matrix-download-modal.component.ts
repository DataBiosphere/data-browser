/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared project matrices downloads inside modal. The modal closes automatically
 * on NavigationStart event. The following actions causes a redirect to the projects page (and therefore closes the modal):
 * 
 * 1. Hitting escape
 * 2. Clicking the close icon
 * 3. Clicking the HCA logo
 */

// Core dependencies
import { Component, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NavigationStart, Router, RouterEvent } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, BehaviorSubject, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ModalOpenedAction } from "../../modal/_ngrx/modal-opened.action";
import { ModalClosedAction } from "../../modal/_ngrx/modal-closed.action";
import { selectSelectedProject } from "../_ngrx/files.selectors";
import { selectProjectMatrixFileLocationsByProjectId } from "../_ngrx/project/project.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ClearSelectedProjectAction } from "../_ngrx/table/clear-selected-project.action";
import { ProjectMatrixDownloadModalState } from "./project-matrix-download-modal.state";
import { EntityName } from "../shared/entity-name.model";

@Component({
    selector: "project-matrix-download-modal",
    templateUrl: "./project-matrix-download-modal.component.html",
    styleUrls: ["./project-matrix-download-modal.component.scss"]
})
export class ProjectMatrixDownloadModalComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();
    
    // Template variables
    public state$ = new BehaviorSubject<ProjectMatrixDownloadModalState>({
        loaded: false
    });

    /**
     * @param {Store<AppState>} store
     * @param {MatDialogRef<ProjectMatrixDownloadModalComponent>} dialogRef
     * @param data
     * @param {Router} router
     */
    constructor(
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<ProjectMatrixDownloadModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private router: Router) {

        this.store.dispatch(new ModalOpenedAction());
    }

    /**
     * Redirect to projects list - called from template on click of close icon, or on keyup of escape key. The resulting
     * navigation event causes the modal to close. See initCloseOnNavigation.
     */
    @HostListener("window:keyup.esc")
    public redirectToProjects(): void {

        this.router.navigate([EntityName.PROJECTS], {
            queryParamsHandling: "preserve"
        });
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
     * Kill subscriptions on destroy of component. Clear selected project.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearSelectedProjectAction());

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

        // Request project details so we can display the project title
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Get any resolved matrix file locations for the selected projects
        const projectMatrixFileLocationsByFileUrl$ =
            this.store.pipe(select(selectProjectMatrixFileLocationsByProjectId, {projectId}));
        
        // Grab the project matrix URLs, if any, for the current set of projects as well as the current project.
        combineLatest(
            this.store.pipe(select(selectSelectedProject)),
            projectMatrixFileLocationsByFileUrl$
        ).pipe(
            map(([project, projectMatrixFileLocationsByFileUrl]) => {

                return {
                    loaded: !!project,
                    project,
                    projectMatrixFileLocationsByFileUrl
                }
            }),
            takeUntil(this.ngDestroy$)
        ).subscribe((state) => {
            this.state$.next(state);
        });
    }
}
