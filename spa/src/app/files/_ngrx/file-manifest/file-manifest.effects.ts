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
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// App dependencies
import { FetchManifestDownloadFileSummaryRequestAction } from "./fetch-manifest-download-file-summary-request.action";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { FetchFileManifestUrlRequestAction } from "./fetch-file-manifest-url-request.action";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import { selectFileFormatsFileFacet } from "../file.selectors";
import { FileSummary } from "../../file-summary/file-summary";
import { AppState } from "../../../_ngrx/app.state";
import { selectSelectedSearchTerms } from "../search/search.selectors";
import { FileManifestService } from "../../shared/file-manifest.service";

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
     * Fetch file summary to populate file type summaries on manifest modal. Include all selected facets except any
     * selected file types, in request.
     */
    @Effect()
    fetchManifestDownloadFileSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectSelectedSearchTerms),
                take(1)
            )),
            switchMap((searchTerms) => this.fileManifestService.fetchFileManifestFileSummary(searchTerms)),
            map((fileSummary: FileSummary) => new FetchManifestDownloadFileSummarySuccessAction(fileSummary))
        );

    /**
     * Request manifest URL.
     */
    @Effect()
    requestFileManifestUrl$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestUrlRequestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectSelectedSearchTerms),
                take(1)
            )),
            switchMap((searchTerms) =>
                this.store.pipe(
                    select(selectFileFormatsFileFacet),
                    take(1),
                    map((fileFormatsFileFacet) => {
                        return {searchTerms, fileFormatsFileFacet};
                    })
                )
            ),
            switchMap(({searchTerms, fileFormatsFileFacet}) =>
                this.fileManifestService.requestFileManifestUrl(searchTerms, fileFormatsFileFacet)),
            map(response => new FetchFileManifestUrlSuccessAction(response))
        );
}
