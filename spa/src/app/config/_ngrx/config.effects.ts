/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Config-related effects, including fetching config from API end point.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

// App dependencies
import { ConfigService } from "../config.service";
import { AppState } from "../../_ngrx/app.state";

@Injectable()
export class ConfigEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private configService: ConfigService) {
    }
}
