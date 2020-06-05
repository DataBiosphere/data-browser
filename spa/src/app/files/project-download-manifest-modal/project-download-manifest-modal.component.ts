/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared manifest downloads inside modal. The modal closes automatically
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
import { combineLatest, BehaviorSubject, Observable, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ModalClosedAction } from "../../modal/_ngrx/modal-closed.action";
import { ModalOpenedAction } from "../../modal/_ngrx/modal-opened.action";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { EntityName } from "../shared/entity-name.model";
import { Project } from "../shared/project.model";
import { ProjectDownloadManifestModalState } from "./project-download-manifest-modal.state";

@Component({
    selector: "project-download-manifest-modal",
    templateUrl: "./project-download-manifest-modal.component.html",
    styleUrls: ["./project-download-manifest-modal.component.scss"]
})
export class ProjectDownloadManifestModalComponent implements OnDestroy, OnInit {

    private ngDestroy$ = new Subject();
    private state$ = new BehaviorSubject<ProjectDownloadManifestModalState>({
        loaded: false
    });

    /**
     * @param {Store<AppState>} store
     * @param {MatDialogRef<ProjectDownloadManifestModalComponent>} dialogRef
     * @param data
     * @param {Router} router
     */
    constructor(private store: Store<AppState>,
        private dialogRef: MatDialogRef<ProjectDownloadManifestModalComponent>,
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

        this.router.navigateByUrl(`/${EntityName.PROJECTS}`, {replaceUrl: true});
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
     * Grab the selected project from the store.
     */
    private selectProject(projectId: string): Observable<Project> {

        return this.store.pipe(
            select(selectSelectedProject),
            filter(project => !!project && project.entryId === projectId)
        );
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the the selected project id and title. Also listen for navigation events, in which case we must
     * close the modal.
     */
    public ngOnInit(): void {

        this.initCloseOnNavigation();

        const projectId = this.data.projectId;

        // Request project details so we can display the project title
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab the current project
        combineLatest(
            this.selectProject(projectId),

        ).pipe(
            map(([project]) => {

                return {
                    loaded: !!project,
                    projectId: project.entryId,
                    projectTitle: project.projectTitle
                }
            }),
            takeUntil(this.ngDestroy$)
        ).subscribe((state) => {
            this.state$.next(state);
        });
    }
}
