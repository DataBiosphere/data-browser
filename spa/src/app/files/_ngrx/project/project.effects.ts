/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Project-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

// App dependencies
import { FetchProjectTSVUrlRequestAction } from "./fetch-project-tsv-url-request.action";
import { FetchProjectTSVUrlSuccessAction } from "./fetch-project-tsv-url-success.action";
import { AppState } from "../../../_ngrx/app.state";
import { ProjectService } from "../../project/project.service";
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";

@Injectable()
export class ProjectEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {ProjectService} projectService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private projectService: ProjectService) {
    }
    
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
