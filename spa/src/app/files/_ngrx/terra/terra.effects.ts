/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Side effects related to Terra-related actions.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, filter, map, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { ExportToTerraInProgressAction } from "./export-to-terra-in-progress.action";
import { ExportToTerraRequestAction } from "./export-to-terra-request.action";
import { ExportToTerraSuccessAction } from "./export-to-terra-success.action";
import { selectFileFormatsFileFacet } from "../facet/facet.selectors";
import { selectSelectedSearchTerms } from "../search/search.selectors";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { TerraService } from "../../shared/terra.service";
import { selectExportToTerra } from "./terra.selectors";

@Injectable()
export class TerraEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {TerraService} terraService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private terraService: TerraService) {}

    /**
     * Trigger export to Terra.
     */
    @Effect()
    exportToTerra$: Observable<Action> = this.actions$
        .pipe(
            ofType(ExportToTerraRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectSelectedSearchTerms), take(1)),
                    this.store.pipe(select(selectFileFormatsFileFacet), take(1))
                )
            )),
            switchMap(([action, searchTerms, fileFormatsFileFacet]) => {

                // Set up the kill switch for the polling of the Tera export. We'll use the value of the response
                // object in the store, and only stop polling if the response state returns to NOT_STARTED (which occurs
                // if user navigates away from export component).
                const killSwitch$ = this.store.pipe(
                    select(selectExportToTerra),
                    map(terraState => terraState.exportToTerraStatus === ExportToTerraStatus.NOT_STARTED),
                    filter(cleared => cleared), // Only allow value to emit if file manifest response has been cleared from the store
                    take(1)
                );
                
                return this.terraService.exportToTerra(searchTerms, fileFormatsFileFacet, killSwitch$);
            }),
            map(response => {
                return this.terraService.isExportToTerraRequestInProgress(response.status) ?
                    new ExportToTerraInProgressAction(response) :
                    new ExportToTerraSuccessAction(response)
            })
        );
}
