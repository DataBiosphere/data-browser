/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Project-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, distinct, filter, map, mergeMap, skip, switchMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { FetchProjectTSVUrlRequestAction } from "./fetch-project-tsv-url-request.action";
import { FetchProjectTSVUrlSuccessAction } from "./fetch-project-tsv-url-success.action";
import { selectCatalog } from "../file.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { ProjectService } from "../../project/project.service";
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";
import { selectProjectById } from "../project-edits/project-edits.selectors";
import { selectProjectTSVUrlResponseByProjectId } from "./project.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { selectPreviousQuery } from "../search/search.selectors";
import { Project } from "../../shared/project.model";
import { ClearSelectedProjectAction } from "../table/clear-selected-project.action";
import { FetchProjectRequestAction, FetchProjectSuccessAction } from "../table/table.actions";
import { ViewProjectTabAction } from "../table/view-project-tab.action";
import { ViewProjectIntegrationAction } from "../table/view-project-integration.action";

@Injectable()
export class ProjectEffects {

    /**
     * @param {GTMService} gtmService
     * @param {ProjectService} projectService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private gtmService: GTMService,
                private projectService: ProjectService,
                private store: Store<AppState>,
                private actions$: Actions) {}

    /**
     * Trigger fetch and display of project, when selected from the project table. Must also grab projects edit data from
     * the store to update publication and contributor details, where specified.
     */
    @Effect()
    fetchProject: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectRequestAction.ACTION_TYPE),
            // Prevent dupe hits to fetch project
            distinct((action: FetchProjectRequestAction) =>
                action.projectId,
                this.actions$.pipe(ofType(ClearSelectedProjectAction.ACTION_TYPE))), // Reset distinct check on clear of project
            // Grab local overrides for the selected project
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectProjectById, {id: action.projectId}), take(1))
                )
            )),
            // Fetch the project and apply any local overrides
            switchMap(([action, catalog, updatedProject]) =>
                this.projectService.fetchProjectById(catalog, action.projectId, updatedProject)),
            // Success - update store with fetched project
            map((project: Project) => new FetchProjectSuccessAction(project))
        );

    /**
     * Trigger tracking of view of a project integration.
     */
    @Effect({dispatch: false})
    viewProjectIntegration$ = this.actions$.pipe(
        ofType(ViewProjectIntegrationAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(this.store.pipe(select(selectPreviousQuery), take(1)))
        )),
        tap(([action, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewProjectIntegrationAction).asEvent({
                currentQuery: queryWhenActionTriggered
            }));
        })
    );

    /**
     * Trigger tracking of view of any project tab (for example, matrices, external resources).
     */
    @Effect({dispatch: false})
    viewProjectTab$ = this.actions$.pipe(
        ofType(ViewProjectTabAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(this.store.pipe(select(selectPreviousQuery), take(1)))
        )),        
        tap(([action, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewProjectTabAction).asEvent({
                currentQuery: queryWhenActionTriggered
            }));
        })
    );

    /**
     * Trigger fetch and store of TSV URL for the specified project.
     */
    @Effect()
    fetchProjectTSVUrl: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectTSVUrlRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.pipe(select(selectCatalog), take(1)))
            )),
            mergeMap(([action, catalog]) => { // Merge map here as we don't want to cancel any previous requests for separate project TSV's
                
                const {projectId, projectName} = action as FetchProjectTSVUrlRequestAction;
                
                // Set up the kill switch for the polling of the project TSV URL. We'll use the existence of the
                // ProjectTSVUrlResponse object for this project, in the store. The ProjectTSVUrlResponse object is
                // created on request of the ProjectTSVUrl and is cleared on destroy of components that initiate the
                // request.
                const killSwitch$ = this.store.pipe(
                    select(selectProjectTSVUrlResponseByProjectId, {projectId: projectId}),
                    skip(1), // Skip the initial undefined value, we need to wait until there's at least an initial response value
                    map(projectTSVUrlResponse => !projectTSVUrlResponse),
                    filter(cleared => cleared) // Only allow value to emit if project TSV URL response for this project has been cleared from the store
                );

                // Fetch project TSV URL
                return this.projectService.fetchProjectTSVUrl(catalog, projectId, projectName, killSwitch$);
            }),
            map((response: ProjectTSVUrlResponse) => new FetchProjectTSVUrlSuccessAction(response))
        );
}
