import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/first";
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/concat';


import { FilesService } from "./files.service";
import { FilesState, selectSelectedFacetsMap, selectSelectedFileFacets } from "../files.reducer";

// Actions
import { ACTIONS } from "../../shared/boardwalk.actions";
import {
    RequestFileSummaryAction,
    ReceiveDownloadFileManifestAction, FileFacetsReceivedAction
} from "../actions/file-actions";
import { FileSummary } from "../file-summary/file-summary";


@Injectable()
export class FilesEffects {

    constructor(private store: Store<FilesState>,
                private actions$: Actions,
                private fileService: FilesService) { }

    /**
     *
     * Trigger update of  facet counts on init.
     *
     * @type {"../../Observable".Observable<R>}
     */
    @Effect()
    initFacets$: Observable<Action> = this.actions$
        .ofType(ACTIONS.INIT_FILE_FACETS)
        .concatMap((action) => {
            return selectSelectedFacetsMap(this.store).first();
        })
        .concatMap((selectedFacets) => {
            return Observable.concat(
                Observable.of(new RequestFileSummaryAction()),
                this.fileService.initFileFacets(selectedFacets)
                    .map((fileFacets) => {
                        return new FileFacetsReceivedAction(fileFacets);
                    })
            );
        });


    /**
     *
     * Trigger update of  facet counts once a facet is selected.
     *
     * @type {"../../Observable".Observable<R>}
     */
    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .ofType(ACTIONS.FILE_FACET_SELECTED)
        .concatMap((action) => {
            return selectSelectedFacetsMap(this.store).first();
        })
        .concatMap((selectedFacets) => {
            return Observable.concat(
                Observable.of(new RequestFileSummaryAction()), //TODO dont make the observable here? do i need concat
                                                               // map AND concat?
                this.fileService
                    .fetchFileFacets(selectedFacets)
                    .map((fileFacets) => new FileFacetsReceivedAction(fileFacets))
            );
        });

    /**
     *
     * Trigger update of file summary if a facet changes.
     *
     * @type {"../../Observable".Observable<R>}
     */
    @Effect()
    fetchSummary$: Observable<Action> = this.actions$
        .ofType(ACTIONS.FILE_FACET_SELECTED, ACTIONS.INIT_FILE_FACETS)
        .mergeMap((action) => {
            return selectSelectedFileFacets(this.store).first();
        })
        .mergeMap((selectedFacets) => {
            return this.fileService.fetchFileSummary(selectedFacets);
        }).map((fileSummary: FileSummary) => {


            if (typeof fileSummary.primarySite === "string") {
                fileSummary.primarySiteCount = 0;
            }

            if (typeof fileSummary.totalFileSize === "string") {
                fileSummary.totalFileSize = 0;
            }

            return {
                type: ACTIONS.FILE_SUMMARY_RECEIVED,
                payload: fileSummary
            };
        });

    /**
     *
     * Trigger Fetch and display of manifest summary once manifest is requested.
     *
     * @type {"../../Observable".Observable<R>}
     */
    @Effect()
    fetchManifestSummary$: Observable<Action> = this.actions$
        .ofType(ACTIONS.REQUEST_FILE_MANIFEST_SUMMARY)
        .mergeMap(() => {
            return selectSelectedFileFacets(this.store).first();
        })
        .mergeMap((selectedFacets) => {
            return this.fileService.fetchFileManifestSummary(selectedFacets);
        }).map((response) => {
            return {
                type: ACTIONS.RECEIVE_FILE_MANIFEST_SUMMARY,
                payload: response
            };
        });

    /**
     *
     * Trigger downooad of manifest.
     *
     * @type {"../../Observable".Observable<R>}
     */
    @Effect()
    downloadFileManifest$: Observable<Action> = this.actions$
        .ofType(ACTIONS.REQUEST_DOWNLOAD_FILE_MANIFEST)
        .mergeMap(() => {
            return selectSelectedFileFacets(this.store).first();
        })
        .mergeMap((query) => {
            return this.fileService.downloadFileManifest(query);
        }).map(() => {
            return new ReceiveDownloadFileManifestAction();
        });
}
