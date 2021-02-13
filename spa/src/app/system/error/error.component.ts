/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying error page.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ErrorComponentState } from "./error.component.state";
import { ClearErrorStateAction } from "../../http/_ngrx/http-clear-state-error.actions";
import { selectErrorMessage, selectRequestUrl } from "../../http/_ngrx/http.selectors";
import { AppState } from "../../_ngrx/app.state";


@Component({
    selector: "error",
    templateUrl: "error.component.html",
    styleUrls: ["error.component.scss"]
})
export class ErrorComponent implements OnDestroy, OnInit {

    // Public variables
    public state$ = new BehaviorSubject<ErrorComponentState>({
        loaded: false
    });

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

    /**
     * Clear error message on exit of error page.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearErrorStateAction());

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up component - grab error message from state, if any.
     */
    public ngOnInit() {

        // Grab references to error message and request URL
        combineLatest(
            this.store.pipe(select(selectErrorMessage)),
            this.store.pipe(select(selectRequestUrl))
        ).pipe(
            takeUntil(this.ngDestroy$)
        ).subscribe(([errorMessage, requestUrl]) => {
            this.state$.next({
                errorMessage,
                loaded: true,
                requestUrl
            })
        })
    }
}
