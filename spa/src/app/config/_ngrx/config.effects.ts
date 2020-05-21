/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Config-related effects, including fetching config from API end point.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";

@Injectable()
export class ConfigEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions) {
    }
}
