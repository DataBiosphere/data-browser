/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Side effects related to system-related actions.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../../files/_ngrx/catalog/catalog.selectors";
import { AppState } from "../../_ngrx/app.state";
import { SystemService } from "../shared/system.service";
import { SystemStatusResponse } from "../shared/system-status-response.model";
import { SystemStatusRequestAction } from "./system-status-request.action";
import { SystemStatusSuccessAction } from "./system-status-success.action";

@Injectable()
export class SystemEffects {
    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {SystemService} systemService
     */
    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private systemService: SystemService
    ) {}

    /**
     * Trigger fetch of system status.
     *
     * @type {Observable<Action>}
     */

    systemStatus$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemStatusRequestAction.ACTION_TYPE),
            switchMap((action: SystemStatusRequestAction) =>
                this.systemService.fetchSystemStatus(action.catalog)
            ),
            map((response: SystemStatusResponse) => {
                return new SystemStatusSuccessAction(
                    response.ok,
                    response.indexing
                );
            })
        )
    );
}
