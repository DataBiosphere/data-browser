/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Cohort manifest-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { of, Observable } from "rxjs";
import { concatMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { selectCatalog } from "../catalog/catalog.selectors";
import { CopyToClipboardCohortManifestURLAction } from "./copy-to-clipboard-cohort-manifest-url.action";
import { DownloadCohortManifestAction } from "./download-cohort-manifest.action";
import { AppState } from "../../../_ngrx/app.state";
import { RequestCohortManifestAction } from "./request-cohort-manifest.action";
import { selectPreviousQuery  } from "../search/search.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";

@Injectable()
export class CohortManifestEffects {

    /**
     * @param {GTMService} gtmService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private gtmService: GTMService,
                private store: Store<AppState>,
                private actions$: Actions) {
    }

    /**
     * Track request, download and copy URL to clipboard for cohort manifest.
     */
    @Effect({dispatch: false})
    trackCohortManifest$ = this.actions$
        .pipe(
            ofType(
                CopyToClipboardCohortManifestURLAction.ACTION_TYPE,
                DownloadCohortManifestAction.ACTION_TYPE,
                RequestCohortManifestAction.ACTION_TYPE
            ),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectPreviousQuery))
                )
            )),
            tap(([action, catalog, queryWhenActionTriggered]) => {

                // Track request action
                this.gtmService.trackEvent((action as TrackingAction).asEvent({
                    catalog,
                    currentQuery: queryWhenActionTriggered
                }));
            })
        );
}
