/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Side effects related to system-related actions.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { HealthFailureAction } from "./health/health-failure.action";
import { HealthRequestAction } from "./health/health-request.action";
import { HealthSuccessAction } from "./health/health-success.action";
import { HealthRequestStatus } from "../shared/health/health-request-status.model";
import { HealthResponse } from "../shared/health/health-response.model";
import { SystemService } from "../shared/system.service";

@Injectable()
export class SystemEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {SystemService} systemService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private systemService: SystemService) {
    }

    /**
     * Trigger fetch of system health, including indexing status.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    healthCheck$: Observable<Action> = this.actions$
        .pipe(
            ofType(HealthRequestAction.ACTION_TYPE),
            switchMap(() => this.systemService.healthCheck()),
            map((response: HealthResponse) => {

                if ( response.status === HealthRequestStatus.COMPLETE ) {
                    return new HealthSuccessAction(response.indexing);
                }

                return new HealthFailureAction();
            })
        );
}
