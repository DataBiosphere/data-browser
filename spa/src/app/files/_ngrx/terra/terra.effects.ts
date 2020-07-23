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
import { concatMap, map, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { ExportToTerraInProgressAction } from "./export-to-terra-in-progress.action";
import { ExportToTerraRequestAction } from "./export-to-terra-request.action";
import { ExportToTerraSuccessAction } from "./export-to-terra-success.action";
import { selectSelectedSearchTerms } from "../search/search.selectors";
import { TerraService } from "../../shared/terra.service";
import { selectFileFormatsFileFacet } from "../facet/facet.selectors";

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
            switchMap(([action, searchTerms, fileFormatsFileFacet]) => 
                this.terraService.exportToTerra(searchTerms, fileFormatsFileFacet)),
            map(response => this.terraService.isExportToTerraRequestInProgress(response.status) ?
                new ExportToTerraInProgressAction(response) :
                new ExportToTerraSuccessAction(response))
        );
}
