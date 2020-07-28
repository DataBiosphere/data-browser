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
import { Observable, of } from "rxjs";
import { concatMap, filter, map, mergeMap, skip, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { FetchMatrixFileFormatsRequestAction } from "./fetch-matrix-file-formats-request.action";
import { FetchMatrixFileFormatsSuccessAction } from "./fetch-matrix-file-formats-success.action";
import { FetchMatrixPartialQueryMatchSuccessAction } from "./fetch-matrix-partial-query-match-success.action";
import { FetchMatrixPartialQueryMatchRequestAction } from "./fetch-matrix-partial-query-match-request.action";
import { FetchMatrixUrlRequestAction } from "./fetch-matrix-url-request.action";
import { FetchMatrixUrlSuccessAction } from "./fetch-matrix-url-success.action";
import { FetchMatrixUrlSpeciesSuccessAction } from "./fetch-matrix-url-species-success.action";
import { FetchProjectMatrixUrlsRequestAction } from "./fetch-project-matrix-urls-request.action";
import { FetchProjectMatrixUrlsSuccessAction } from "./fetch-project-matrix-urls-success.action";
import { selectMatrixUrlRequestsBySpecies, selectProjectMatrixUrlsByProjectId } from "./matrix.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { selectSelectedSearchTerms, selectSelectedSearchTermsBySearchKey } from "../search/search.selectors";
import { FilesService } from "../../shared/files.service";
import { DEFAULT_TABLE_PARAMS } from "../../table/pagination/table-params.model";
import { SearchTerm } from "../../search/search-term.model";
import { MatrixService } from "../../shared/matrix.service";
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";
import { MatrixUrlRequestSpecies } from "../../shared/matrix-url-request-species.model";

@Injectable()
export class MatrixEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {FilesService} fileService
     * @param {MatrixService} matrixService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private fileService: FilesService,
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
     * Determine if all data, or only some of the data, for the current seach terms will be included in a generated
     * matrix.
     */
    @Effect()
    fetchMatrixPartialQueryStatus: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchMatrixPartialQueryMatchRequestAction.ACTION_TYPE),
            switchMap(() =>
                this.store.pipe(
                    select(selectSelectedSearchTermsBySearchKey),
                    take(1)
                )
            ),
            switchMap((selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>) => {
                
                return this.fileService.fetchIsMatrixPartialQueryMatch(selectedSearchTermsBySearchKey, DEFAULT_TABLE_PARAMS);
            }),
            map((partialQueryMatch: boolean) => {
                
                return new FetchMatrixPartialQueryMatchSuccessAction(partialQueryMatch);
            })
        );

    /**
     * Request cohort matrix URL. This could potentially return multiple URLs, one per species that is applicable to
     * the request.
     */
    @Effect()
    requestMatrixUrl$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchMatrixUrlRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectSelectedSearchTerms), take(1))
                )
            )),
            switchMap(([action, searchTerms]) => {

                // Set up the kill switch for the polling of the matrix URL. We'll use the value of the response
                // object in the store, and only stop polling if the response state is empty.
                const killSwitch$ = this.store.pipe(
                    select(selectMatrixUrlRequestsBySpecies),
                    skip(1), // Skip the initial null value, we need to wait until there's at least an initial response value
                    map(matrixUrlRequestsBySpecies => matrixUrlRequestsBySpecies.size === 0),
                    filter(cleared => cleared), // Only allow value to emit if matrix response for this project has been cleared from the store
                    take(1)
                );
                
                const {fileFormat} = (action as FetchMatrixUrlRequestAction);
                return this.matrixService.requestMatrixUrl(searchTerms, fileFormat, killSwitch$);
            }),
            map(response => {

                // Response can be of type MatrixUrlRequest or MatrixUrlRequestSpecies
                if ( response["matrixUrlRequestsBySpecies"] ) {
                    return new FetchMatrixUrlSpeciesSuccessAction(response as MatrixUrlRequestSpecies)
                }

                return new FetchMatrixUrlSuccessAction(response as MatrixUrlRequest);
            })
        );

    /**
     * Request matrix URLs, if any, for the specified project.
     */
    @Effect()
    fetchProjectMatrixURLs$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectMatrixUrlsRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectProjectMatrixUrlsByProjectId), take(1))
                )
            )),
            mergeMap(([action, projectMatrixUrls]) =>
                this.matrixService.fetchProjectMatrixURLs(
                    projectMatrixUrls, (action as FetchProjectMatrixUrlsRequestAction).entityId)),
            map(response => new FetchProjectMatrixUrlsSuccessAction(response))
        );
}
