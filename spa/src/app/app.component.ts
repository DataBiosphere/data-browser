/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Top-level application component.
 */

// Core dependencies
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { SyncSessionRequestAction } from "./auth/_ngrx/auth.actions";
import { AppState } from "./_ngrx/app.state";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

    private sessionPoller: any;

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Lifecycle hooks
     */

    /**
     * Component initialization - check authentication status of current user.
     */
    ngOnInit() {
        
        // Check authentication status of current user
        this.store.dispatch(new SyncSessionRequestAction());
        this.sessionPoller = setInterval(() => {
            this.store.dispatch(new SyncSessionRequestAction());
        }, 60 * 1000);
    }

    /**
     * Clean up session check.
     */
    ngOnDestroy() {
        clearInterval(this.sessionPoller);
    }
}
