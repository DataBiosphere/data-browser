/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Entity-related effects. An entity is currently one of Projects, Samples or Files.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import {
    concatMap,
    filter,
    map,
    mergeMap,
    switchMap,
    take,
    withLatestFrom,
} from "rxjs/operators";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { LoginSuccessAction } from "../../../auth/_ngrx/login-success.action";
import { LogoutSuccessAction } from "../../../auth/_ngrx/logout-success.action";
import { BackToEntityAction } from "./back-to-entity.action";
import { selectCatalog } from "../catalog/catalog.selectors";
import { ClearEntitiesAction } from "./clear-entities.action";
import { NoOpAction } from "../facet/no-op.action";
import { selectTableQueryParams } from "../files.selectors";
import { InitEntityStateAction } from "./init-entity-state.action";
import { AppState } from "../../../_ngrx/app.state";
import { selectPreviousQuery } from "../search/search.selectors";
import { SelectEntityAction } from "./select-entity.action";
import { EntityName } from "../../shared/entity-name.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { getSelectedTable } from "../table/table.state";
import { selectTerraAuthInitAndRegistered } from "../../../auth-terra/_ngrx/terra-auth.selectors";

@Injectable()
export class EntityEffects {
    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {GTMService} gtmService
     */
    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private gtmService: GTMService
    ) {}

    /**
     * Handle change in user's authenticated status; clear any cached entities, navigate to projects, init (re-fetch)
     * projects state.
     */

    onLogout$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(
                // LoginSuccessAction.ACTION_TYPE,
                LogoutSuccessAction.ACTION_TYPE
            ),
            mergeMap(() => {
                return of(
                    new ClearEntitiesAction(),
                    new SelectEntityAction(EntityName.PROJECTS)
                );
            })
        )
    );

    /**
     * Handle change in user's authenticated status; clear any cached entities, navigate to projects, init (re-fetch)
     * projects state.
     */

    onLogin$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginSuccessAction.ACTION_TYPE),
            switchMap(() => {
                return this.store.pipe(
                    select(selectTerraAuthInitAndRegistered),
                    filter(({ init }) => init),
                    map(({ registered }) => registered)
                );
            }),
            mergeMap((registered: boolean) => {
                // If user is registered with Terra, update state and redirect user.
                if (registered) {
                    return of(
                        new ClearEntitiesAction(),
                        new SelectEntityAction(EntityName.PROJECTS)
                    );
                }

                // User is not registered with Terra; do nothing here and let Terra effects handle display of registration
                // required page.
                return of(new NoOpAction());
            })
        )
    );

    /**
     * Handle action where tab is selected (ie Projects, Samples, Files).
     */

    switchTabs$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(
                SelectEntityAction.ACTION_TYPE,
                BackToEntityAction.ACTION_TYPE
            ),
            concatMap((action) =>
                of(action).pipe(
                    withLatestFrom(
                        this.store.pipe(select(selectCatalog), take(1)),
                        this.store.pipe(
                            select(selectTableQueryParams),
                            take(1)
                        ),
                        this.store.pipe(select(selectPreviousQuery), take(1))
                    )
                )
            ),
            map(
                ([
                    action,
                    catalog,
                    tableQueryParams,
                    queryWhenActionTriggered,
                ]) => {
                    // Track change of tab
                    this.gtmService.trackEvent(
                        (action as TrackingAction).asEvent({
                            catalog,
                            currentQuery: queryWhenActionTriggered,
                        })
                    );

                    // Return cached table, if available
                    if (
                        getSelectedTable(tableQueryParams.tableState).data
                            .length
                    ) {
                        return new NoOpAction();
                    }

                    // Table data has not been previously loaded and is therefore not cached.
                    return new InitEntityStateAction();
                }
            )
        )
    );
}
