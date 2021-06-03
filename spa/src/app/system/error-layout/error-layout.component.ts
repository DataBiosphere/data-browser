/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for determining how to display a system error, for both specific errors (404) or general, catch
 * all errors.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ErrorLayoutComponentState } from "./error-layout.component.state";
import { selectStatusCode } from "../../http/_ngrx/http.selectors";
import { AppState } from "../../_ngrx/app.state";


@Component({
    selector: "error-layout",
    templateUrl: "error-layout.component.html",
    styleUrls: ["error-layout.component.scss"]
})
export class ErrorLayoutComponent implements OnDestroy, OnInit {

    // Public variables
    public state$ = new BehaviorSubject<ErrorLayoutComponentState>({
        loaded: false
    });

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

    /**
     * Returns true if error is a not found error.
     * 
     * @param {number} statusCode
     * @returns {boolean}
     */
    public isErrorNotFound(statusCode: number): boolean {

        return statusCode === 404;
    }

    /**
     * Kill subscriptions on destroy. Clear of dispatch state is handle on navigate, see ErrorEffects.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up component - grab error message from state, if any.
     */
    public ngOnInit() {

        // Grab references to error message and request URL
        this.store.pipe(select(selectStatusCode)).pipe(
            takeUntil(this.ngDestroy$)
        ).subscribe((statusCode) => {
            this.state$.next({
                loaded: true,
                statusCode
            })
        })
    }
}
