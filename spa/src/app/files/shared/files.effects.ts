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

    private colorWheel: Map< string, string >;
    private colorWheelSet: boolean;
    private colors: string[];

    constructor(

        private store: Store<FilesState>,
        private actions$: Actions,
        private fileService: FilesService) {
        this.colorWheel = new Map<string, string >();
        this.colorWheelSet = false;

       this.colors = [
           "#1A535C",
           "#4CC9C0",
           "#5C83D0",
           "#FF6B6B",
           "#FFA560",
           "#FFE66D",
           "#113871", // dark blue
           "#336C74", // light green
           "#ABF0EB", // light turquoise
           "#B3C9F2", // light light purple
           "#B6D67E", // lime green
           "#BE5951", // salmon
           "#FFBABA", // light peach
           "#FFD2AF", // light orange
           "#eeeeee"
        ];
    }

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

                    fileFacets.forEach((fileFacet) => {

                        let colorIndex = 0;
                        fileFacet.terms.forEach((term) => {
                            term.color = this.colors[colorIndex];
                            const key = fileFacet.name + ":" + term.name;
                            this.colorWheel.set(key, term.color );
                            colorIndex++;
                        });
                    });
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
                Observable.of(new RequestFileSummaryAction()), // TODO dont make the observable here? do i need concat
                                                               // map AND concat?
                this.fileService
                    .initFileFacets(selectedFacets)
                    .map((fileFacets) => {
                        fileFacets.forEach((fileFacet) => {
                            fileFacet.terms.forEach((term) => {
                                const key = fileFacet.name + ":" + term.name;
                                term.color = this.colorWheel.get(key);
                            });
                        });

                        return new FileFacetsReceivedAction(fileFacets);
                })
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
