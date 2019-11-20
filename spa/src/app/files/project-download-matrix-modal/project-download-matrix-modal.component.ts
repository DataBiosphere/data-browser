/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared expression matrices downloads inside modal. Displayed 
 */

// Core dependencies
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, BehaviorSubject, Observable, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { FetchProjectMatrixUrlsRequestAction } from "../_ngrx/matrix/fetch-project-matrix-urls-request.action";
import { selectProjectMatrixUrlsByProjectId } from "../_ngrx/matrix/matrix.selectors";
import { EntityName } from "../shared/entity-name.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { ProjectDownloadMatrixModalState } from "./project-download-matrix-modal.state";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-download-matrix-modal",
    templateUrl: "./project-download-matrix-modal.component.html",
    styleUrls: ["./project-download-matrix-modal.component.scss"]
})
export class ProjectDownloadMatrixModalComponent implements OnDestroy, OnInit {

    private ngDestroy$ = new Subject();
    private state$ = new BehaviorSubject<ProjectDownloadMatrixModalState>({
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
        private dialogRef: MatDialogRef<ProjectDownloadMatrixModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private router: Router) {
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
     * Grab the matrix URLs for the selected project.
     * 
     * @param {string} projectId
     * @returns {Observable<ProjectMatrixUrls>}
     */
    private selectProjectMatrixUrls(projectId: string): Observable<ProjectMatrixUrls> {

        return this.store.pipe(
            select(selectProjectMatrixUrlsByProjectId),
            filter((matrixUrlsByProjectId: Map<string, ProjectMatrixUrls>) => {
                return !!matrixUrlsByProjectId.get(projectId);
            }),
            map((matrixUrlsByProjectId: Map<string, ProjectMatrixUrls>) => {
                return matrixUrlsByProjectId.get(projectId);
            })
        )
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the prepared matrix URLs for the selected project. Also listen for close events (click on backdrop or escape
     * key) and redirect to projects list.
     */
    public ngOnInit(): void {
        
        this.dialogRef.beforeClosed().pipe(
            takeUntil(this.ngDestroy$)
        ).subscribe(() => {
            this.redirectToProjects();
        });

        const projectId = this.data.projectId;

        // Request project details so we can display the project title
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Determine which matrix formats, if any, are available for download for the current project
        this.store.dispatch(new FetchProjectMatrixUrlsRequestAction(projectId));
        
        // Grab the project matrix URLs, if any, for the current set of projects as well as the current project
        combineLatest(
            this.selectProject(projectId),
            this.selectProjectMatrixUrls(projectId)
            
        ).pipe(
            map(([project, projectMatrixUrls]) => {

                return {
                    loaded: !!project && !!projectMatrixUrls,
                    project,
                    projectMatrixUrls,
                }
            }),
            takeUntil(this.ngDestroy$)
        ).subscribe((state) => {
            this.state$.next(state);
        });
    }
}
