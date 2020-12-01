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
import { concatMap, map, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { FetchIntegrationsByProjectIdRequestAction } from "./fetch-integrations-by-project-id-request.action";
import { FetchIntegrationsByProjectIdSuccessAction } from "./fetch-integrations-by-project-id-success.action";
import { selectIntegrationsByProjectId } from "./integration.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { IntegrationService } from "../../shared/integration.service";

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
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectIntegrationsByProjectId), take(1))
                )
            )),
            // Query for the integrations if we don't already have the integrations stored for this project
            switchMap(([action, catalog, integrationsByProjectId]) => {
                
                const projectId = (action as FetchIntegrationsByProjectIdRequestAction).projectId;
                if ( integrationsByProjectId.has(projectId) ) {
                    return of({projectId, integrations: integrationsByProjectId.get(projectId)});
                }

                return this.integrationService.fetchIntegrationsByProjectId(catalog, projectId).pipe(
                    map(integrations => ({projectId, integrations}))
                );
            }),
            map(({projectId, integrations}) => new FetchIntegrationsByProjectIdSuccessAction(projectId, integrations))
        );
}
