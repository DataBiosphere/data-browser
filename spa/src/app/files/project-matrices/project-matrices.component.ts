/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project expression matrices associated with a project.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/files.selectors";
import {
    selectProjectMatrixArchivePreviewsByProjectId,
    selectProjectMatrixFileLocationsByProjectId
} from "../_ngrx/project/project.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { ProjectTab } from "../project-detail/project-tab.model";
import { ProjectMatricesComponentState } from "./project-matrices.component.state";
import EntitySpec from "../shared/entity-spec";

@Component({
    selector: "project-matrices",
    templateUrl: "./project-matrices.component.html",
    styleUrls: ["./project-matrices.component.scss"]
})
export class ProjectMatricesComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Template variables
    public state$ = new BehaviorSubject<ProjectMatricesComponentState>({
        loaded: false
    });

    /**
     * @param {ProjectDetailService} projectDetailService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     */
    constructor(private projectDetailService: ProjectDetailService,
                private store: Store<AppState>,
                private activatedRoute: ActivatedRoute,
                private router: Router) {}

    /**
     * Return user to project overview
     */
    public getBackButtonTab(): EntitySpec[] {

        const key = "Project Overview";
        return [{
            key,
            displayName: key
        }];
    }

    /**
     * Handle click on back button.
     *
     * @param {string} projectId
     */
    public onTabSelected(projectId: string): void {

        this.router.navigate(["/projects", projectId]);
    }

    /**
     * Clear project meta tags.
     */
    public ngOnDestroy() {

        // Set up tracking of project tab
        this.projectDetailService.removeProjectMeta();

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        // Get any resolved matrix file locations for the selected projects
        const projectMatrixFileLocationsByFileUrl$ = 
            this.store.pipe(select(selectProjectMatrixFileLocationsByProjectId, {projectId}));

        // List archive previews for the selected project's matrices.
        const projectMatrixArchivePreviewsByMatrixId$ = 
            this.store.pipe(select(selectProjectMatrixArchivePreviewsByProjectId, {projectId}));

        combineLatest([
            project$,
            projectMatrixArchivePreviewsByMatrixId$,
            projectMatrixFileLocationsByFileUrl$
        ])
        .pipe(
            takeUntil(this.ngDestroy$),
            filter(([project]) => !!project)
        ).subscribe(([project, projectMatrixArchivePreviewsByMatrixId, projectMatrixFileLocationsByFileUrl]) => {
    
            this.state$.next({
                loaded: true,
                project,
                projectMatrixArchivePreviewsByMatrixId,
                projectMatrixFileLocationsByFileUrl
            });

            // Set up project description meta
            this.projectDetailService.addProjectMeta(project.projectTitle, ProjectTab.PROJECT_MATRICES);
        });
    }
}
