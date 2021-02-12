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
import { combineLatest, Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";

// App dependencies
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { ProjectMetadataComponentState } from "./project-metadata.component.state";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { ProjectTab } from "../project-detail/project-tab.model";

@Component({
    selector: "project-metadata",
    templateUrl: "./project-metadata.component.html",
    styleUrls: ["./project-metadata.component.scss"]
})
export class ProjectMetadataComponent implements OnDestroy, OnInit {

    // Template variables
    public state$: Observable<ProjectMetadataComponentState>;

    /**
     * @param {ProjectDetailService} projectDetailService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     */
    public constructor(private projectDetailService: ProjectDetailService,
                       private store: Store<AppState>,
                       private activatedRoute: ActivatedRoute) {}

    /**
     * Set up tracking of tab. Set project meta tags.
     */
    private initTab() {

        this.state$.pipe(
            take(1)
        ).subscribe((state) => {
            this.projectDetailService.addProjectMeta(state.projectTitle, ProjectTab.PROJECT_METADATA);
            this.projectDetailService.trackTabView(GAAction.VIEW_METADATA, state.projectId, state.projectShortname);
        });
    }

    /**
     * Clear project meta tags.
     */
    public ngOnDestroy() {

        // Set up tracking of project tab
        this.projectDetailService.removeProjectMeta();
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

        this.state$ = combineLatest(
            project$,
        )
        .pipe(
            filter(([project]) => !!project),
            map(([project]) => {

                return {
                    projectId: project.entryId,
                    projectShortname: project.projectShortname,
                    projectTitle: project.projectTitle
                };
            })
        );

        // Set up tracking of project tab
        this.initTab();
    }
}
