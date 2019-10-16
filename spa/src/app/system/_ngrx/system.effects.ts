/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
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
import { HealthRequestAction } from "./health/health-request.action";
import { HealthSuccessAction } from "./health/health-success.action";
import { IndexRequestAction } from "./index/index-request.action";
import { IndexSuccessAction } from "./index/index-success.action";
import { IndexFailureAction } from "./index/index-failure.action";
import { AppState } from "../../_ngrx/app.state";
import { HealthResponse } from "../shared/health/health-response.model";
import { IndexResponse } from "../shared/index/index-response.model";
import { IndexRequestStatus } from "../shared/index/index-request-status.model";
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
     * Trigger fetch of index status.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    indexStatus$: Observable<Action> = this.actions$
        .pipe(
            ofType(IndexRequestAction.ACTION_TYPE),
            switchMap(() => this.systemService.checkIndexStatus()),
            map((response: IndexResponse) => {

                if ( response.status === IndexRequestStatus.COMPLETE ) {
                    return new IndexSuccessAction(response.ok, response.indexing);
                }

                return new IndexFailureAction();
            })
        );

    /**
     * Trigger fetch of system health.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    healthCheck$: Observable<Action> = this.actions$
        .pipe(
            ofType(HealthRequestAction.ACTION_TYPE),
            switchMap(() => this.systemService.checkHealth()),
            map((response: HealthResponse) => {

                return new HealthSuccessAction(response.ok);
            })
        );
}
