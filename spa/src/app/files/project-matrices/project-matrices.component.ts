/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project expression matrices associated with a project.
 */

// Core dependencies
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";
import { combineLatest, Observable, of } from "rxjs";
import { map, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectMatrixUrlsRequestAction } from "../_ngrx/matrix/fetch-project-matrix-urls-request.action";
import { selectProjectMatrixUrlsByProjectId } from "../_ngrx/matrix/matrix.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectAnalyticsService } from "../project/project-analytics.service";
import { ProjectMatricesComponentState } from "./project-matrices.component.state";
import { GAAction } from "../../shared/analytics/ga-action.model";

@Component({
    selector: "project-matrices",
    templateUrl: "./project-matrices.component.html",
    styleUrls: ["./project-matrices.component.scss"]
})
export class ProjectMatricesComponent {

    // Template variables
    public state$: Observable<ProjectMatricesComponentState>;

    /**
     * @param {ConfigService} configService
     * @param {ProjectAnalyticsService} projectAnalyticsService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     */
    constructor(private configService: ConfigService,
                private projectAnalyticsService: ProjectAnalyticsService,
                private store: Store<AppState>,
                private activatedRoute: ActivatedRoute) {}


    /**
     * Returns true if environment is v2 - used to switch out matrix download functionality in template.
     *
     * @returns {boolean}
     */
    public isV2(): boolean {

        return this.configService.isV2();
    }

    /**
     * Set up tracking of tab.
     */
    private initTracking() {

        this.state$.pipe(
            take(1)
        ).subscribe((state) => {
            const project = state.project;
            this.projectAnalyticsService.trackTabView(GAAction.VIEW_MATRICES, project.entryId, project.projectShortname);
        });
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Determine which matrix formats, if any, are available for download for this project.  Not required for
        // v2 environments as Azul returns contributor and generated matrices values with project.
        const v2 = this.isV2(); 
        if ( !v2 ) {
            this.store.dispatch(new FetchProjectMatrixUrlsRequestAction(projectId));
        }

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        // Grab the project matrix URLs, if any, for this project
        const projectMatrixUrls$ = v2 ? of({} as any) : this.store.pipe(
            select(selectProjectMatrixUrlsByProjectId),
            map(projectMatrixUrlsByProjectId => projectMatrixUrlsByProjectId.get(projectId))
        );

        this.state$ = combineLatest(
            project$,
            projectMatrixUrls$,
        )
            .pipe(
                map(([project, projectMatrixUrls]) => {

                    return {
                        project,
                        projectMatrixUrls
                    };
                })
            );

        // Set up tracking of project tab
        this.initTracking();
    }
}
