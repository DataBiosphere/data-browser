/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Side effects of analysis protocol-related actions. 
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { concatMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { selectPreviousQuery } from "../search/search.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { ViewAnalysisProtocolAction } from "./view-analysis-protocol.action";

@Injectable()
export class AnalysisProtocolEffects {

    /**
     * @param {GTMService} gtmService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private gtmService: GTMService,
                private store: Store<AppState>,
                private actions$: Actions) {}

    /**
     * Track click of link to analysis protocol in the Data Portal.
     */
    @Effect({dispatch: false})
    viewAnalysisProtocol$ = this.actions$.pipe(
        ofType(ViewAnalysisProtocolAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectPreviousQuery), take(1))
            )
        )),
        tap(([action, catalog, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewAnalysisProtocolAction).asEvent({
                catalog,
                currentQuery: queryWhenActionTriggered
            }));
        })
    );
}
