// Core dependencies
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { SyncSessionRequestAction } from "./auth/_ngrx/auth.actions";
import { AppState } from "./_ngrx/app.state";

/**
 * Root app!
 */
@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

    private sessionPoller: any;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new SyncSessionRequestAction());
        this.sessionPoller = setInterval(() => {
            this.store.dispatch(new SyncSessionRequestAction());
        }, 60 * 1000);
    }

    ngOnDestroy() {
        clearInterval(this.sessionPoller);
    }
}
