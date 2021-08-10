/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Auth-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

// App dependencies
import { AuthService } from "../auth.service";
import { AuthState } from "./auth.state";
import { LoginRequestAction } from "./login-request.action";
import { LogoutRequestAction } from "./logout-request.action";

@Injectable()
export class AuthEffects {

    /**
     * @param authService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private authService: AuthService,
                private store: Store<AuthState>,
                private actions$: Actions) {
    }

    /**
     * Handle login.
     */
    @Effect({dispatch: false})
    login$: Observable<Action> = this.actions$
        .pipe(
            ofType(LoginRequestAction.ACTION_TYPE),
            tap(() => {
                this.authService.login();
            })
        );

    /**
     * Handle logout.
     */
    @Effect({dispatch: false})
    logout$: Observable<Action> = this.actions$
        .pipe(
            ofType(LogoutRequestAction.ACTION_TYPE),
            tap(() => {
                this.authService.logout();
            })
        );
}
