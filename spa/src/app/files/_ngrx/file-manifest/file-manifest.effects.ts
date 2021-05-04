/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * File manifest-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { of, Observable } from "rxjs";
import { concatMap, filter, map, skip, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { selectFileFormatsFileFacet } from "../facet/facet.selectors";
import { FetchManifestDownloadFileSummaryRequestAction } from "./fetch-manifest-download-file-summary-request.action";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { FetchFileManifestUrlRequestAction } from "./fetch-file-manifest-url-request.action";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import { selectFileManifestManifestResponse } from "./file-manifest.selectors";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { FileSummary } from "../../file-summary/file-summary";
import { AppState } from "../../../_ngrx/app.state";
import { selectSelectedSearchTerms } from "../search/search.selectors";

@Injectable()
export class FileManifestEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {FileManifestService} fileManifestService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private fileManifestService: FileManifestService) {
    }

    /**
     * Fetch file summary to populate file type summaries on get data pages. Include all selected facets except
     * any selected file types, in request.
     */
    @Effect()
    fetchManifestDownloadFileSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectSelectedSearchTerms), take(1))
                )
            )),
            switchMap(([action, catalog, searchTerms]) => 
                this.fileManifestService.fetchFileManifestFileSummary(catalog, searchTerms)),
            map((fileSummary: FileSummary) => new FetchManifestDownloadFileSummarySuccessAction(fileSummary))
        );

    /**
     * Request manifest URL.
     */
    @Effect()
    requestFileManifestUrl$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestUrlRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectSelectedSearchTerms), take(1)),
                    this.store.pipe(select(selectFileFormatsFileFacet), take(1))
                )
            )),
            switchMap(([action, catalog, searchTerms, fileFormatsFileFacet]) => {

                // Set up the kill switch for the polling of the file manifest URL. We'll use the value of the response
                // object in the store, and only stop polling if the response state returns to NOT_STARTED (which occurs
                // if user navigates away from download component).
                const killSwitch$ = this.store.pipe(
                    select(selectFileManifestManifestResponse),
                    skip(1), // Skip the initial NOT_STARTED value, we need to wait until there's at least an initial response value
                    map(manifestResponse => manifestResponse.status === ManifestStatus.NOT_STARTED),
                    filter(cleared => cleared), // Only allow value to emit if file manifest response has been cleared from the store
                    take(1)
                );

                const {manifestFormat} = action as FetchFileManifestUrlRequestAction;
                return this.fileManifestService.requestFileManifestUrl(
                    catalog, searchTerms, fileFormatsFileFacet, manifestFormat, killSwitch$);
            }),
            map(response => new FetchFileManifestUrlSuccessAction(response))
        );
}
