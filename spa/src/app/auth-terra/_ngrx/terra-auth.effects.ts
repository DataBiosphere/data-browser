/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Terra auth-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

// App dependencies
import { NoOpAction } from "../../files/_ngrx/facet/no-op.action";
import { LoginSuccessAction } from "../../auth/_ngrx/login-success.action";
import { TerraAuthService } from "../terra-auth.service";
import { TerraAuthState } from "./terra-auth.state";

@Injectable()
export class TerraAuthEffects {

    /**
     * @param terraAuthService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private terraAuthService: TerraAuthService,
                private store: Store<TerraAuthState>,
                private actions$: Actions) {
    }

    /**
     * User has logged in; check Terra registration status.
     */
    @Effect()
    onLogin$: Observable<Action> = this.actions$.pipe(
        ofType(
            LoginSuccessAction.ACTION_TYPE
        ),
        switchMap(() => {
           return this.terraAuthService.getRegistrationStatus();
        }),
        map(() => {

            // Wait for Terra registration response, then continue as is.
            return new NoOpAction();
        })
    );
}
