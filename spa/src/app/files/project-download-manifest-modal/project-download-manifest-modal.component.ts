/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared manifest downloads inside modal.
 */

// Core dependencies
import { Component, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, BehaviorSubject, Observable, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
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
     * @param {MatDialogRef<ProjectDownloadMatrixModalComponent>} dialogRef
     * @param data
     * @param {Router} router
     */
    constructor(
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<ProjectDownloadManifestModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private router: Router) {
    }

    /**
     * Close dialog on key up of escape key.
     */
    @HostListener("window:keyup.esc") onKeyUp() {

        this.dialogRef.close();
        this.redirectToProjects()
    }

    /**
     * Close modal and redirect to projects list.
     */
    public onClosedClicked(): void {

        this.dialogRef.close();
        this.redirectToProjects();
    }

    /**
     * Redirect to projects list.
     */
    public redirectToProjects(): void {

        this.router.navigateByUrl(`/${EntityName.PROJECTS}`, {replaceUrl: true});
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
     * Grab the the selected project id and title. Also listen for close events (click on backdrop or escape
     * key) and redirect to projects list.
     */
    public ngOnInit(): void {

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
