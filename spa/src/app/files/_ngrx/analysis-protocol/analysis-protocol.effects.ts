/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Side effects of analysis protocol-related actions. 
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
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
        tap((action: ViewAnalysisProtocolAction) => {
            this.gtmService.trackEvent(action.asEvent());
        })
    );
}
