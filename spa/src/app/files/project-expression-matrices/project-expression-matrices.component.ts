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
import { map } from "rxjs/operators";

// App dependencies
import { FetchProjectMatrixUrlsRequestAction } from "../_ngrx/matrix/fetch-project-matrix-urls-request.action";
import { selectProjectMatrixUrlsByProjectId } from "../_ngrx/matrix/matrix.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectExpressionMatricesState } from "./project-expression-matrices.state";

@Component({
    selector: "project-expression-matrices",
    templateUrl: "./project-expression-matrices.component.html",
    styleUrls: ["./project-expression-matrices.component.scss"]
})
export class ProjectExpressionMatricesComponent {

    // Template variables
    public state$: Observable<ProjectExpressionMatricesState>;

    /**
     *
     * @param {ActivatedRoute} activatedRoute
     * @param {Store<AppState>} store
     */
    public constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
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

        // Grab the project matrix URLs, if any, for this project
        const projectMatrixUrls$ = this.store.pipe(
            select(selectProjectMatrixUrlsByProjectId),
            map(projectMatrixUrlsByProjectId => projectMatrixUrlsByProjectId.get(projectId))
        );

        this.state$ = combineLatest(
            projectMatrixUrls$,
        )
            .pipe(
                map(([projectMatrixUrls]) => {

                    return {
                        projectMatrixUrls: projectMatrixUrls,
                    };
                })
            );
    }
}
