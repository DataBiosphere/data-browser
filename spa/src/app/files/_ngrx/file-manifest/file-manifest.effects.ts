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
import { concatMap, distinct, filter, map, skip, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { ClearFilesFacetsAction } from "./clear-files-facets.action";
import { selectFileFormatsFileFacet } from "../facet/facet.selectors";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FetchProjectFilesFacetsRequestAction } from "../facet/fetch-project-files-facets-request.action";
import { FetchFileManifestFileTypeSummariesRequestAction } from "./fetch-file-manifest-file-type-summaries-request.action";
import { FetchFileManifestFileTypeSummariesSuccessAction } from "./fetch-file-manifest-file-type-summaries-success.action";
import { FetchFileManifestUrlRequestAction } from "./fetch-file-manifest-url-request.action";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import {
    selectFileManifestManifestResponse,
    selectProjectFileFormatsFileFacet,
    selectProjectSelectedSearchTerms
} from "./file-manifest.selectors";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { FileSummary } from "../../file-summary/file-summary";
import { FetchFilesFacetsSuccessAction } from "./fetch-files-facets-success.action";
import { FetchProjectFileSummaryRequestAction } from "./fetch-project-file-summary-request.actions";
import { FetchProjectFileSummarySuccessAction } from "./fetch-project-file-summary-success.actions";
import { FetchFilesFacetsRequestAction } from "./fetch-files-facets-request.action";
import { AppState } from "../../../_ngrx/app.state";
import { selectSelectedSearchTerms, selectSelectedSearchTermsBySearchKey } from "../search/search.selectors";
import { SearchTerm } from "../../search/search-term.model";
import { EntityName } from "../../shared/entity-name.model";
import { SelectFileFacetTermAction } from "../search/select-file-facet-term.action";
import { FilesService } from "../../shared/files.service";
import { DEFAULT_TABLE_PARAMS } from "../../table/pagination/table-params.model";

@Injectable()
export class FileManifestEffects {

    /**
     * @param {FilesService} filesService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {FileManifestService} fileManifestService
     */
    constructor(private filesService: FilesService,
                private store: Store<AppState>,
                private actions$: Actions,
                private fileManifestService: FileManifestService) {
    }

    /**
     * Fetch facets from files endpoint to populate facet summary and species form in get data and project downloads
     * flows.
     */
    @Effect()
    fetchFilesFacets$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFilesFacetsRequestAction.ACTION_TYPE),
            // Prevent dupe hits to fetch files facets. Reset distinct on select of term, or clear of fetch files 
            // facets action.
            distinct((action) => action.type,
                this.actions$.pipe(ofType(ClearFilesFacetsAction.ACTION_TYPE, SelectFileFacetTermAction.ACTION_TYPE))
            ),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectSelectedSearchTermsBySearchKey), take(1))
                )
            )),
            switchMap(([action, catalog, selectedSearchTermsBySearchKey]) => {

                return this.filesService.fetchEntitySearchResults(
                    catalog,
                    selectedSearchTermsBySearchKey,
                    DEFAULT_TABLE_PARAMS,
                    EntityName.FILES);
            }),
            map((entitySearchResults) => {

                return new FetchFilesFacetsSuccessAction(entitySearchResults.facets);
            })
        );

    /**
     * Fetch file types summaries to populate file type form on selected data downloads. Include all selected facets
     * except any selected file types, in request.
     */
    @Effect()
    fetchFileTypeSummaries$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestFileTypeSummariesRequestAction.ACTION_TYPE),
            concatMap((action: FetchFileManifestFileTypeSummariesRequestAction) => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(
                        action.projectDownload ?
                                select(selectProjectSelectedSearchTerms) :
                                select(selectSelectedSearchTerms), 
                        take(1)
                    )
                )
            )),
            switchMap(([, catalog, selectedSearchTerms]) => 
                this.fileManifestService.fetchFileManifestFileSummary(catalog, selectedSearchTerms)),
            map((fileSummary: FileSummary) => 
                new FetchFileManifestFileTypeSummariesSuccessAction(fileSummary.fileTypeSummaries))
        );

    /**
     * Fetch facets from files endpoint specific to the specified project, to populate facet summary in project
     * download flows.
     */
    @Effect()
    fetchProjectFilesFacets$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectFilesFacetsRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectProjectSelectedSearchTerms), take(1))
                )
            )),
            switchMap(([, catalog, selectedSearchTerms]) => {

                const selectedSearchTermsBySearchKey = selectedSearchTerms.reduce((accum, selectedSearchTerm: SearchTerm) => {

                    const searchKey = selectedSearchTerm.getSearchKey();
                    let searchTerms = accum.get(searchKey);
                    if ( !searchTerms ) {
                        searchTerms = new Set();
                        accum.set(searchKey, searchTerms);
                    }
                    searchTerms.add(selectedSearchTerm);
                    return accum;
                }, new  Map<string, Set<SearchTerm>>());
``
                return this.filesService.fetchEntitySearchResults(
                    catalog,
                    selectedSearchTermsBySearchKey,
                    DEFAULT_TABLE_PARAMS,
                    EntityName.FILES);
            }),
            map((entitySearchResults) => {

                return new FetchFilesFacetsSuccessAction(entitySearchResults.facets);
            })
        );

    /**
     * Trigger update of project-specific file summary. File summary includes the donor count, file count etc that are
     * specific to a selected project and any file types that have been selected during project files download (either
     * curl or export to Terra).
     * 
     * TODO:
     * This can be generalised to just fetchSummary to cover both get data and project flows once get data downloads
     * are updated to use download-specific selected search terms rather than the app-wide selected search terms. Also
     * update corresponding request/success actions, state field, selectors etc.
     */
    @Effect()
    fetchProjectSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectFileSummaryRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectProjectSelectedSearchTerms), take(1))
                )
            )),
            switchMap(([, catalog, selectedSearchTerms]) => {

                return this.filesService.fetchFileSummary(catalog, selectedSearchTerms);
            }),
            map((fileSummary: FileSummary) => new FetchProjectFileSummarySuccessAction(fileSummary))
        );    

    /**
     * Request manifest URL.
     * 
     * TODO
     * Combine with export to Terra functionality for both get data and project downloads.
     */
    @Effect()
    requestFileManifestUrl$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestUrlRequestAction.ACTION_TYPE),
            concatMap((action: FetchFileManifestUrlRequestAction) => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(
                        action.projectDownload ?
                                select(selectProjectSelectedSearchTerms) :
                                select(selectSelectedSearchTerms),
                        take(1)
                    ),
                    this.store.pipe(
                        action.projectDownload ?
                            select(selectProjectFileFormatsFileFacet) :
                            select(selectFileFormatsFileFacet),
                        take(1)
                    )
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
                    catalog, searchTerms, fileFormatsFileFacet as FileFacet, manifestFormat, killSwitch$);
            }),
            map(response => new FetchFileManifestUrlSuccessAction(response))
        );
}
