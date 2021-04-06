/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying metadata associated with a project.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { selectSelectedProject } from "../_ngrx/files.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { ProjectTab } from "../project-detail/project-tab.model";
import { ProjectMetadataComponentState } from "./project-metadata.component.state";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-metadata",
    templateUrl: "./project-metadata.component.html",
    styleUrls: ["./project-metadata.component.scss"]
})
export class ProjectMetadataComponent implements OnDestroy, OnInit {

    // Template variables
    public state$ = new BehaviorSubject<ProjectMetadataComponentState>({
        loaded: false
    });

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {ProjectDetailService} projectDetailService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     */
    public constructor(private projectDetailService: ProjectDetailService,
                       private store: Store<AppState>,
                       private activatedRoute: ActivatedRoute) {
    }

    /**
     * Set up tracking of tab. Set project meta tags.
     * 
     * @param {Project} project
     */
    private initTab(project: Project) {

        this.projectDetailService.addProjectMeta(project.projectTitle, ProjectTab.PROJECT_METADATA);
        this.projectDetailService.trackTabView(GAAction.VIEW_METADATA, project.entryId, project.projectShortname);
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
        this.store
            .pipe(
                select(selectSelectedProject),
                takeUntil(this.ngDestroy$),
                filter((project) => !!project)
            )
            .subscribe(project => {

                this.state$.next({
                    loaded: true,
                    project
                });

                // Set up tracking of project tab
                this.initTab(project);
            });
    }
}
