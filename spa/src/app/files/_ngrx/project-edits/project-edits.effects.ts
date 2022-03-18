/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects from project edits-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// App dependencies
import { FetchProjectEditsRequestAction } from "./fetch-project-edits-request.action";
import { FetchProjectEditsSuccessAction } from "./fetch-project-edits-success.action";
import { AppState } from "../../../_ngrx/app.state";
import { ProjectEditsService } from "../../shared/project-edits.service";

@Injectable()
export class ProjectEditsEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {ProjectEditsService} projectEditsService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private projectEditsService: ProjectEditsService) {
    }
    
    /**
     * Trigger fetch of project edits.
     */
    
    fetchProjectEdits: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(FetchProjectEditsRequestAction.ACTION_TYPE),
            switchMap(() => {

                return this.projectEditsService.fetchProjectEdits();
            }),
            map((projects) => {

                return new FetchProjectEditsSuccessAction(projects);
            })
        ));
}
