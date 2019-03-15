/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component responsible for displaying error page.
 */



// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ClearErrorStateAction } from "../../http/_ngrx/http-clear-state-error.actions";
import { selectErrorMessage } from "../../http/_ngrx/http.selectors";


@Component({
    selector: "error",
    templateUrl: "error.component.html",
    styleUrls: ["error.component.scss"]
})
export class ErrorComponent implements OnDestroy, OnInit {

    // Public variables
    public errorMessage$: Observable<string>;

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

    /**
     * Life cycle hooks
     */

    /**
     * Clear error message on exit of error page.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearErrorStateAction());
    }

    /**
     * Set up component - grab error message from state, if any.
     */
    public ngOnInit() {

        // Grab reference to error message
        this.errorMessage$ = this.store.pipe(select(selectErrorMessage));
    }
}
