import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/first";

import { ACTIONS } from "../../shared/boardwalk.actions";
import { FilesService } from "./files.service";
import { selectFiltersAsQuery, State } from "../reducer";

@Injectable()
export class FilesEffects {

    constructor(private store: Store<State>,
                private actions$: Actions,
                private fileService: FilesService) { }

    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .ofType(ACTIONS.SELECT_FILE_FILTER, ACTIONS.RECEIVE_FILE_FILTERS)
        .mergeMap((action) => {
            return selectFiltersAsQuery(this.store).first();
        })
        .mergeMap((filter) => {
            return this.fileService.fetchFileFacets(filter);
        });

    @Effect()
    fetchSummary$: Observable<Action> = this.actions$
        .ofType(ACTIONS.SELECT_FILE_FILTER, ACTIONS.RECEIVE_FILE_FILTERS)
        .mergeMap((action) => {
            return selectFiltersAsQuery(this.store).first();
        })
        .mergeMap((filter) => {
            return this.fileService.fetchFileSummary(filter);
        });

    @Effect()
    fetchManifestSummary$: Observable<Action> = this.actions$
        .ofType(ACTIONS.REQUEST_FILE_MANIFEST_SUMMARY)
        .mergeMap(() => {
            return selectFiltersAsQuery(this.store).first();
        })
        .mergeMap((filter) => {
            return this.fileService.fetchFileManifestSummary(filter);
        });

    @Effect()
    downloadFileManifest$: Observable<Action> = this.actions$
        .ofType(ACTIONS.REQUEST_DOWNLOAD_FILE_MANIFEST)
        .mergeMap(() => {
            return selectFiltersAsQuery(this.store).first();
        })
        .mergeMap((query) => {
            return this.fileService.downloadFileManifest(query);
        });
}
