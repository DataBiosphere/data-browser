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
import { Observable } from "rxjs";
import { distinct, map, mergeMap, switchMap, tap } from "rxjs/operators";

// App dependencies
import { FetchProjectTSVUrlRequestAction } from "./fetch-project-tsv-url-request.action";
import { FetchProjectTSVUrlSuccessAction } from "./fetch-project-tsv-url-success.action";
import { AppState } from "../../../_ngrx/app.state";
import { ProjectService } from "../../project/project.service";
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";
import { selectProjectById } from "../project-edits/project-edits.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { Project } from "../../shared/project.model";
import { ClearSelectedProjectAction } from "../table/clear-selected-project.action";
import { FetchProjectRequestAction, FetchProjectSuccessAction } from "../table/table.actions";
import { ViewProjectTabAction } from "../table/view-project-tab.action";

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
            distinct((action: FetchProjectRequestAction)  =>
                action.projectId,
                this.actions$.pipe(ofType(ClearSelectedProjectAction.ACTION_TYPE))), // Reset distinct check on clear of project
            // Grab local overrides for the selected project
            switchMap((action: FetchProjectRequestAction) => {

                return this.store.pipe(
                    select(selectProjectById, {id: action.projectId}),
                    map((updatedProject: Project) => {

                        // Grab the project from the release
                        return {action, updatedProject};
                    })
                );
            }),
            // Fetch the project and apply any local overrides
            switchMap(({action, updatedProject}) =>
                this.projectService.fetchProjectById(action.projectId, updatedProject)),
            // Success - update store with fetched project
            map((project: Project) => new FetchProjectSuccessAction(project))
        );

    /**
     * Trigger tracking of view of any project tab.
     */
    @Effect({dispatch: false})
    viewProjectTab: Observable<Action> = this.actions$.pipe(
        ofType(ViewProjectTabAction.ACTION_TYPE),
        tap((action: ViewProjectTabAction) => {
            this.gtmService.trackEvent(action.asEvent());
        })
    );

    /**
     * Trigger fetch and store of TSV URL for the specified project.
     */
    @Effect()
    fetchProjectTSVUrl: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectTSVUrlRequestAction.ACTION_TYPE),
            mergeMap((action) => { // Merge map here as we don't want to cancel any previous requests for separate project TSV's
                const {projectId, projectName, killSwitch$} = action as FetchProjectTSVUrlRequestAction;
                return this.projectService.fetchProjectTSVUrl(projectId, projectName, killSwitch$);
            }),
            map((response: ProjectTSVUrlResponse) => new FetchProjectTSVUrlSuccessAction(response))
        );
}
