/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Matrix-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

// App dependencies
import { FetchMatrixFileFormatsRequestAction, FetchMatrixFileFormatsSuccessAction } from "./matrix.actions";
import { MatrixService } from "../../shared/matrix.service";
import { AppState } from "../../../_ngrx/app.state";

@Injectable()
export class MatrixEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {MatrixService} matrixService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private matrixService: MatrixService) {
    }

    /**
     * Trigger fetch and display of matrix file formats.
     */
    @Effect()
    fetchMatrixFileFormats: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchMatrixFileFormatsRequestAction.ACTION_TYPE),
            switchMap(() => this.matrixService.fetchFileFormats()),
            map((fileFormats: string[]) => new FetchMatrixFileFormatsSuccessAction(fileFormats))
        );
}
