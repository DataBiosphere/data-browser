/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Error-related side effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

// App dependencies
import { ErrorAction } from "../../../http/_ngrx/error.action";

@Injectable()
export class ErrorEffects {

    /**
     * @param {Router} router
     * @param {Actions} actions$
     */
    constructor(private router: Router, private actions$: Actions) {}

    /**
     * Navigate to error page on client-side error.
     */
    @Effect({dispatch: false})
    navigateToError$ = this.actions$.pipe(
        ofType(ErrorAction.ACTION_TYPE),
        tap(() => {
            this.router.navigate(["error"], {
                queryParamsHandling: "preserve"
            });
        })
    );
}
