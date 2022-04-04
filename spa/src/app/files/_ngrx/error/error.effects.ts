/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Error-related side effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Actions, createEffect } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { filter, map, switchMap, take } from "rxjs/operators";

// App dependencies
import { ClearErrorStateAction } from "../../../http/_ngrx/http-clear-state-error.actions";
import { selectIsError } from "../../../http/_ngrx/http.selectors";
import { AppState } from "../../../_ngrx/app.state";

@Injectable()
export class ErrorEffects {
    /**
     * @param {Router} router
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(
        private router: Router,
        private store: Store<AppState>,
        private actions$: Actions
    ) {}

    /**
     * Clear error on navigate.
     */

    clearError$ = createEffect(() =>
        this.router.events.pipe(
            filter((evt) => evt instanceof NavigationStart),
            switchMap(() => this.store.pipe(select(selectIsError), take(1))),
            filter((error) => error),
            map(() => new ClearErrorStateAction())
        )
    );
}
