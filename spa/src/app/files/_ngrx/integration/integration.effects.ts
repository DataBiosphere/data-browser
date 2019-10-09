/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects from integrations-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { FetchIntegrationsByProjectIdRequestAction } from "./fetch-integrations-by-project-id-request.action";
import { FetchIntegrationsByProjectIdSuccessAction } from "./fetch-integrations-by-project-id-success.action";
import { IntegrationService } from "../../shared/integration.service";
import { selectIntegrationsByProjectId } from "./integration.selectors";

@Injectable()
export class IntegrationEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {IntegrationService} integrationService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private integrationService: IntegrationService) {
    }
    
    /**
     * Trigger fetch of integrations for the specified project ID.
     */
    @Effect()
    fetchIntegrationsByProjectId: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchIntegrationsByProjectIdRequestAction.ACTION_TYPE),
            // Check the store for integrations for this project
            switchMap((action) => {
                const projectId = (action as FetchIntegrationsByProjectIdRequestAction).projectId;
                return this.store.pipe(
                    select(selectIntegrationsByProjectId),
                    take(1),
                    map((integrationsByProjectId) => ({
                        projectId,
                        integrationsByProjectId
                    }))
                );
            }),
            // Query for the integrations if we don't already have the integrations stored for this project
            switchMap(({projectId, integrationsByProjectId}) => { 
                if ( integrationsByProjectId.has(projectId) ) {
                    return of({projectId, integrations: integrationsByProjectId.get(projectId)});
                }
                return this.integrationService.fetchIntegrationsByProjectId(projectId).pipe(
                    map(integrations => ({projectId, integrations}))
                );
            }),
            map(({projectId, integrations}) => new FetchIntegrationsByProjectIdSuccessAction(projectId, integrations))
        );
}
