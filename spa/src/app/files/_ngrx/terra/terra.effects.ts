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
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { TerraService } from "../../shared/terra.service";
import { selectFileFacets } from "../file.selectors";
import { ExportToTerraRequestAction } from "./export-to-terra-request.action";
import { ExportToTerraSuccessAction } from "./export-to-terra-success.actions";

@Injectable()
export class TerraEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {TerraService} terraService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private terraService: TerraService) {
    }


    /**
     * Trigger export to Terra.
     */
    @Effect()
    exportToTerra$: Observable<Action> = this.actions$
        .pipe(
            ofType(ExportToTerraRequestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectFileFacets),
                take(1)
            )),
            switchMap((query) => this.terraService.exportToTerra(query)),
            map(response => new ExportToTerraSuccessAction(response))
        );
}
