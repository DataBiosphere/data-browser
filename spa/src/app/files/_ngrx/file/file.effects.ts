/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * File-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, map, mergeMap, take, withLatestFrom, tap } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { ClearFileFileLocationsAction } from "./clear-file-file-locations.action";
import { FetchFileFileLocationRequestAction } from "./fetch-file-file-location-request.action";
import { FetchFileFileLocationSuccessAction } from "./fetch-file-file-location-success.action";
import { FileLocationService } from "../../file-location/file-location.service";
import { AppState } from "../../../_ngrx/app.state";
import { selectPreviousQuery } from "../search/search.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";

@Injectable()
export class FileEffects {

    /**
     * @param {FileLocationService} fileLocationService
     * @param {GTMService} gtmService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private fileLocationService: FileLocationService, 
                private gtmService: GTMService,
                private store: Store<AppState>,
                private actions$: Actions) {}

    /**
     * Trigger fetch and store of file file location.
     */
    
    fetchFileFileLocation$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(FetchFileFileLocationRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectPreviousQuery), take(1))
                )
            )),
            // Merge map here as we don't want to cancel any previous requests for separate project manifests
            mergeMap(([action, catalog, queryWhenActionTriggered]) => {

                // Track request
                this.gtmService.trackEvent((action as FetchFileFileLocationRequestAction).asEvent({
                    catalog,
                    currentQuery: queryWhenActionTriggered
                }));

                const { fileUrl } = action as FetchFileFileLocationRequestAction;

                // Create kill switch for request polling: kill when clear action is triggered.
                const killSwitch$ = this.actions$.pipe(
                    ofType(ClearFileFileLocationsAction.ACTION_TYPE),
                    map(_ => true),
                    take(1)
                );

                const fileLocation$ = this.fileLocationService.fetchFileLocation(fileUrl, killSwitch$);
                return fileLocation$.pipe(
                    withLatestFrom(of(fileUrl))
                );
            }),
            map(([fileLocation, fileUrl]) => {

                return new FetchFileFileLocationSuccessAction(fileUrl, fileLocation);
            })
        ));
}
