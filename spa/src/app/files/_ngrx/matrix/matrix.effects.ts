/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Matrix-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// App dependencies
import { FetchMatrixFileFormatsRequestAction } from "./fetch-matrix-file-formats-request.action";
import { FetchMatrixFileFormatsSuccessAction } from "./fetch-matrix-file-formats-success.action";
import { FetchMatrixUrlRequestAction } from "./fetch-matrix-url-request.action";
import { FetchMatrixUrlSuccessAction } from "./fetch-matrix-url-success.action";
import { FetchProjectMatrixUrlsRequestAction } from "./fetch-project-matrix-urls-request.action";
import { FetchProjectMatrixUrlsSuccessAction } from "./fetch-project-matrix-urls-success.action";
import { MatrixService } from "../../shared/matrix.service";
import { selectProjectMatrixUrlsByProjectId } from "./matrix.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { selectSelectedSearchTerms } from "../search/search.selectors";

@Injectable()
export class MatrixEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {MatrixService} matrixService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private matrixService: MatrixService) {
    }
    
    /**
     * Trigger fetch and display of matrix file formats.
     */
    @Effect()
    fetchMatrixFileFormats: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchMatrixFileFormatsRequestAction.ACTION_TYPE),
            switchMap(() => this.matrixService.fetchFileFormats()),
            map((fileFormats: string[]) => new FetchMatrixFileFormatsSuccessAction(fileFormats))
        );

    /**
     * Request manifest URL.
     */
    @Effect()
    requestMatrixUrl$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchMatrixUrlRequestAction.ACTION_TYPE),
            switchMap((action) =>
                this.store.pipe(
                    select(selectSelectedSearchTerms),
                    take(1),
                    map((searchTerms) => {
                        return {searchTerms, action};
                    })
                )
            ),
            switchMap(({searchTerms, action}) =>
                this.matrixService.requestMatrixUrl(searchTerms, (action as FetchMatrixUrlRequestAction).fileFormat)),
            map(response => new FetchMatrixUrlSuccessAction(response))
        );

    /**
     * Request matrix URLs, if any, for the specified project.
     */
    @Effect()
    fetchProjectMatrixURLs$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectMatrixUrlsRequestAction.ACTION_TYPE),
            switchMap((action) =>
                this.store.pipe(
                    select(selectProjectMatrixUrlsByProjectId),
                    take(1),
                    map((projectMatrixUrls) => {
                        return {projectMatrixUrls, action};
                    })
                )
            ),
            switchMap(({projectMatrixUrls, action}) =>
                this.matrixService.fetchProjectMatrixURLs(
                    projectMatrixUrls, (action as FetchProjectMatrixUrlsRequestAction).entityId)),
            map(response => new FetchProjectMatrixUrlsSuccessAction(response))
        );
}
