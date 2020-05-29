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
import { combineLatest, Observable } from "rxjs";
import { map, take } from "rxjs/operators";

// App dependencies
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectMatrixUrlsRequestAction } from "../_ngrx/matrix/fetch-project-matrix-urls-request.action";
import { selectProjectMatrixUrlsByProjectId } from "../_ngrx/matrix/matrix.selectors";
import { selectSelectedSearchTerms } from "../_ngrx/search/search.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectAnalyticsService } from "../project/project-analytics.service";
import { ProjectExpressionMatricesComponentState } from "./project-expression-matrices.component.state";
import { GAAction } from "../../shared/analytics/ga-action.model";

@Component({
    selector: "project-expression-matrices",
    templateUrl: "./project-expression-matrices.component.html",
    styleUrls: ["./project-expression-matrices.component.scss"]
})
export class ProjectExpressionMatricesComponent {

    // Template variables
    public state$: Observable<ProjectExpressionMatricesComponentState>;

    /**
     * @param {ProjectAnalyticsService} projectAnalyticsService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     */
    constructor(private projectAnalyticsService: ProjectAnalyticsService,
                private store: Store<AppState>,
                private activatedRoute: ActivatedRoute) {}

    /**
     * Set up tracking of tab.
     */
    private initTracking() {

        // Grab the current set of selected terms 
        const selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));

        combineLatest(this.state$, selectedSearchTerms$).pipe(
            take(1)
        ).subscribe(([state, selectedSearchTerms]) => {

            this.projectAnalyticsService.trackTabView(GAAction.VIEW_MATRICES, state.project.projectShortname, selectedSearchTerms);
        });
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Determine which matrix formats, if any, are available for download for this project
        this.store.dispatch(new FetchProjectMatrixUrlsRequestAction(projectId));

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        // Grab the project matrix URLs, if any, for this project
        const projectMatrixUrls$ = this.store.pipe(
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
