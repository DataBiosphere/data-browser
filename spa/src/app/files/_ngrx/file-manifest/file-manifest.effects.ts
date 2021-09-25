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
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { FetchFileManifestFileTypeSummariesRequestAction } from "./fetch-file-manifest-file-type-summaries-request.action";
import { FetchFileManifestFileTypeSummariesSuccessAction } from "./fetch-file-manifest-file-type-summaries-success.action";
import { FetchFileManifestUrlRequestAction } from "./fetch-file-manifest-url-request.action";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import { selectFileManifestManifestResponse } from "./file-manifest.selectors";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { FileSummary } from "../../file-summary/file-summary";
import { AppState } from "../../../_ngrx/app.state";
import { selectSelectedSearchTerms } from "../search/search.selectors";
import { SearchEntity } from "../../search/search-entity.model";
import { FetchFileManifestProjectFileTypeSummariesRequestAction } from "./fetch-file-manifest-project-file-type-summaries-request.action";
import { FetchFileManifestUrlProjectRequestAction } from "./fetch-file-manifest-url-project-request.action";
import { FileFacet } from "../../facet/file-facet/file-facet.model";

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
     * Fetch file types summaries to populate file type form on selected data downloads. Include all selected facets
     * except any selected file types, in request.
     */
    @Effect()
    fetchFileManifestFileTypeSummaries$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestFileTypeSummariesRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectSelectedSearchTerms), take(1)),
                    this.store.pipe(select(selectCatalog), take(1))
                )
            )),
            switchMap(([, searchTerms, catalog]) => 
                this.fileManifestService.fetchFileManifestFileSummary(catalog, searchTerms)),
            map((fileSummary: FileSummary) => 
                new FetchFileManifestFileTypeSummariesSuccessAction(fileSummary.fileTypeSummaries))
        );

    /**
     * Fetch file types summaries to populate file type form on project file downloads.
     */
    @Effect()
    fetchFileManifestProjectFileTypeSummaries$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestProjectFileTypeSummariesRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1))
                )
            )),
            switchMap(([action, catalog]) => {

                const { projectId } = action as FetchFileManifestProjectFileTypeSummariesRequestAction;
                const projectSearchTerm = new SearchEntity(FileFacetName.PROJECT_ID, projectId, projectId);
                return this.fileManifestService.fetchFileManifestFileSummary(
                    catalog, [projectSearchTerm]);
            }),
            map((fileSummary: FileSummary) => 
                new FetchFileManifestFileTypeSummariesSuccessAction(fileSummary.fileTypeSummaries))
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

    /**
     * Request manifest URL for a specific poject.
     */
    @Effect()
    requestFileManifestUrlProject$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestUrlProjectRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                )
            )),
            switchMap(([action, catalog]) => {

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
                
                // Set up search terms; include project ID and any selected file formats
                const { fileFormatFacet, manifestFormat, projectId, selectedSearchTerms: selectedFileFormatSearchTerms } = 
                    action as FetchFileManifestUrlProjectRequestAction;
                const selectedSearchTerms = [
                    ...selectedFileFormatSearchTerms,
                    new SearchEntity(FileFacetName.PROJECT_ID, projectId, projectId)
                ]; 
                
                // Request file manifest
                return this.fileManifestService.requestFileManifestUrl(
                    catalog, selectedSearchTerms, fileFormatFacet as FileFacet, manifestFormat, killSwitch$);
            }),
            map(response => new FetchFileManifestUrlSuccessAction(response))
        );
}
