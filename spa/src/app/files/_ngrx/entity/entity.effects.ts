/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Entity-related effects. An entity is currently one of Projects, Samples or Files.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, take } from "rxjs/operators";
import { concatMap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { SelectEntityAction } from "./select-entity.action";
import { selectTableQueryParams } from "../file.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { getSelectedTable } from "../table/table.state";
import { BackToEntityAction } from "./back-to-entity.action";
import { selectPreviousQuery } from "../search/search.selectors";
import { InitEntityStateAction } from "./init-entity-state.action";
import { NoOpAction } from "../facet/no-op.action";

@Injectable()
export class EntityEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {GTMService} gtmService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private gtmService: GTMService) {
    }

    /**
     * Handle action where tab is selected (ie Projects, Samples, Files).
     */
    @Effect()
    switchTabs: Observable<Action> = this.actions$
        .pipe(
            ofType(
                SelectEntityAction.ACTION_TYPE,
                BackToEntityAction.ACTION_TYPE
            ),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectTableQueryParams), take(1)),
                    this.store.pipe(select(selectPreviousQuery), take(1))
                )
            )),
            map(([action, tableQueryParams, queryWhenActionTriggered]) => {

                // Track change of tab
                this.gtmService.trackEvent((action as SelectEntityAction).asEvent({
                    currentQuery: queryWhenActionTriggered
                }));

                // Return cached table, if available
                if ( getSelectedTable(tableQueryParams.tableState).data.length ) {
                    return new NoOpAction();
                }

                // Table data has not been previously loaded and is therefore not cached.
                return new InitEntityStateAction();
            })
        );
}
