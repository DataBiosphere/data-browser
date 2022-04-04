/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects triggered during get data functionality/
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { concatMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { selectCatalog } from "../catalog/catalog.selectors";
import { CopyToClipboardBulkDownloadAction } from "./copy-to-clipboard-bulk-download.action";
import { AppState } from "../../../_ngrx/app.state";
import { RequestBulkDownloadAction } from "./request-bulk-download.action";
import { selectPreviousQuery } from "../search/search.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { selectSelectedEntitySpec } from "../files.selectors";

@Injectable()
export class GetDataEffects {
    /**
     * @param {GTMService} gtmService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(
        private gtmService: GTMService,
        private store: Store<AppState>,
        private actions$: Actions
    ) {}

    /**
     * Trigger tracking of request bulk download, or copy to clipboard of bulk download curl command.
     */

    trackBulkDownload$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CopyToClipboardBulkDownloadAction.ACTION_TYPE,
                    RequestBulkDownloadAction.ACTION_TYPE
                ),
                concatMap((action) =>
                    of(action).pipe(
                        withLatestFrom(
                            this.store.pipe(select(selectCatalog), take(1)),
                            this.store.pipe(
                                select(selectPreviousQuery),
                                take(1)
                            ),
                            this.store.pipe(
                                select(selectSelectedEntitySpec),
                                take(1)
                            )
                        )
                    )
                ),
                tap(
                    ([
                        action,
                        catalog,
                        queryWhenActionTriggered,
                        selectedEntitySpec,
                    ]) => {
                        this.gtmService.trackEvent(
                            (action as TrackingAction).asEvent({
                                catalog,
                                currentQuery: queryWhenActionTriggered,
                                index: selectedEntitySpec.key,
                            })
                        );
                    }
                )
            ),
        { dispatch: false }
    );
}
