/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects from release-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// App dependencies
import { FetchReleasesRequestAction } from "./fetch-releases-request.action";
import { FetchReleasesSuccessAction } from "./fetch-releases-success.action";
import { AppState } from "../../../_ngrx/app.state";
import { ReleaseService } from "../../shared/release.service";

@Injectable()
export class ReleaseEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {ReleaseService} releaseService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private releaseService: ReleaseService) {
    }
    
    /**
     * Trigger fetch of releases. Note, this currently only loads the data for the 2020-mar release.
     */
    @Effect()
    fetchReleases: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchReleasesRequestAction.ACTION_TYPE),
            switchMap(() => {

                return this.releaseService.fetch2020MarchRelease();
            }),
            map((release) => {

                return new FetchReleasesSuccessAction([release]);
            })
        );
}
