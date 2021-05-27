/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Side effects related to Terra-related actions.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, filter, map, switchMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { CopyToClipboardTerraUrlAction } from "./copy-to-clipboard-terra-url.action";
import { ExportToTerraInProgressAction } from "./export-to-terra-in-progress.action";
import { ExportToTerraActionRequest } from "./export-to-terra-action.request";
import { ExportToTerraSuccessAction } from "./export-to-terra-success.action";
import { selectFileFormatsFileFacet } from "../facet/facet.selectors";
import { LaunchTerraAction } from "./launch-terra.action";
import { AppState } from "../../../_ngrx/app.state";
import { selectPreviousQuery, selectSelectedSearchTerms } from "../search/search.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { TerraService } from "../../shared/terra.service";
import { selectExportToTerra } from "./terra.selectors";

@Injectable()
export class TerraEffects {

    /**
     * @param {GTMService} gtmService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {TerraService} terraService
     */
    constructor(private gtmService: GTMService,
                private store: Store<AppState>,
                private actions$: Actions,
                private terraService: TerraService) {}
    
    /**
     * Track copy of Terra URL to clipboard.
     */
    @Effect({dispatch: false})
    copyTerraUrlToClipboard$ = this.actions$
        .pipe(
            ofType(CopyToClipboardTerraUrlAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectPreviousQuery), take(1)),
                )
            )),
            tap(([action, catalog, queryWhenActionTriggered]) => {

                // Track request action
                this.gtmService.trackEvent((action as CopyToClipboardTerraUrlAction).asEvent({
                    catalog,
                    currentQuery: queryWhenActionTriggered
                }));
            })
        );
    /**
     * Trigger export to Terra.
     */
    @Effect()
    exportToTerra$: Observable<Action> = this.actions$
        .pipe(
            ofType(ExportToTerraActionRequest.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectSelectedSearchTerms), take(1)),
                    this.store.pipe(select(selectFileFormatsFileFacet), take(1)),
                    this.store.pipe(select(selectPreviousQuery), take(1)),
                )
            )),
            switchMap(([action, catalog, searchTerms, fileFormatsFileFacet, queryWhenActionTriggered]) => {

                // Track request action
                this.gtmService.trackEvent((action as ExportToTerraActionRequest).asEvent({
                    catalog,
                    currentQuery: queryWhenActionTriggered
                }));

                // Set up the kill switch for the polling of the Tera export. We'll use the value of the response
                // object in the store, and only stop polling if the response state returns to NOT_STARTED (which occurs
                // if user navigates away from export component).
                const killSwitch$ = this.store.pipe(
                    select(selectExportToTerra),
                    map(terraState => terraState.exportToTerraStatus === ExportToTerraStatus.NOT_STARTED),
                    filter(cleared => cleared), // Only allow value to emit if file manifest response has been cleared from the store
                    take(1)
                );
                
                return this.terraService.exportToTerra(catalog, searchTerms, fileFormatsFileFacet, killSwitch$);
            }),
            map(response => {
                return this.terraService.isExportToTerraRequestInProgress(response.status) ?
                    new ExportToTerraInProgressAction(response) :
                    new ExportToTerraSuccessAction(response)
            })
        );

    /**
     * Track launch of Terra.
     */
    @Effect({dispatch: false})
    launchTerra$ = this.actions$
        .pipe(
            ofType(LaunchTerraAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectPreviousQuery), take(1)),
                )
            )),
            tap(([action, catalog, queryWhenActionTriggered]) => {

                // Track request action
                this.gtmService.trackEvent((action as LaunchTerraAction).asEvent({
                    catalog,
                    currentQuery: queryWhenActionTriggered
                }));
            })
        );
}
