import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/first";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/of";
import * as _ from "lodash";

import { FilesService } from "./files.service";
import {
    FilesState, selectSelectedFacetsMap, selectSelectedFileFacets, selectFileFacetMetadataSummary
} from "../files.reducer";

// Actions
import { ACTIONS } from "../../shared/boardwalk.actions";
import {
    RequestFileSummaryAction,
    ReceiveDownloadFileManifestAction, FileFacetsReceivedAction, FileFacetMetadataSummaryRequestedAction,
    FileFacetMetadataSummaryReceivedAction
} from "../actions/file-actions";
import { FileSummary } from "../file-summary/file-summary";
import { FileFacetMetadata } from "../file-facet-metadata/file-facet-metadata.model";
import { FileFacet } from "./file-facet.model";


@Injectable()
export class FilesEffects {

    private colorWheel: Map< string, string >;
    private colorWheelSet: boolean;
    private colors: string[];

    constructor(private store: Store<FilesState>,
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
     * @type {Observable<Action>}
     */
    @Effect()
    initFacets$: Observable<Action> = this.actions$
        .ofType(ACTIONS.INIT_FILE_FACETS)
        .switchMap((action) => {
            // return selectSelectedFacetsMap(this.store).first();
            return this.store.select(selectSelectedFacetsMap).first();
        })
        .switchMap((selectedFacets) => {
            return Observable.concat(
                // Request Summary
                Observable.of(new RequestFileSummaryAction()),
                // Request Metadata
                Observable.of(new FileFacetMetadataSummaryRequestedAction()),
                // Request Facets, and sort by metadata
                this.fetchOrderedFileFacets(selectedFacets)
                    .map((fileFacets) => {

                        fileFacets.forEach((fileFacet) => {

                            let colorIndex = 0;
                            fileFacet.terms.forEach((term) => {
                                term.color = this.colors[colorIndex];
                                const key = fileFacet.name + ":" + term.name;
                                this.colorWheel.set(key, term.color);
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
     * @type {Observable<Action>}
     */
    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .ofType(ACTIONS.FILE_FACET_SELECTED)
        .switchMap((action) => {
            // return selectSelectedFacetsMap(this.store).first();
            return this.store.select(selectSelectedFacetsMap).first();
        })
        .switchMap((selectedFacets) => {

            return Observable.concat(
                Observable.of(new RequestFileSummaryAction()), // TODO dont make the observable here? do i need concat
                // map AND concat?
                this.fetchOrderedFileFacets(selectedFacets)
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
     * @type {Observable<Action>}
     */
    @Effect()
    fetchSummary$: Observable<Action> = this.actions$
        .ofType(ACTIONS.FILE_FACET_SELECTED, ACTIONS.INIT_FILE_FACETS)
        .switchMap((action) => {
            // return selectSelectedFileFacets(this.store).first();
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((selectedFacets) => {
            return this.fileService.fetchFileSummary(selectedFacets);
        })
        .map((fileSummary: FileSummary) => {


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
     * @type {Observable<Action>}
     */
    @Effect()
    fetchManifestSummary$: Observable<Action> = this.actions$
        .ofType(ACTIONS.REQUEST_FILE_MANIFEST_SUMMARY)
        .switchMap(() => {
            // return selectSelectedFileFacets(this.store).first();
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((selectedFacets) => {
            return this.fileService.fetchFileManifestSummary(selectedFacets);
        })
        .map((response) => {
            return {
                type: ACTIONS.RECEIVE_FILE_MANIFEST_SUMMARY,
                payload: response
            };
        });

    /**
     *
     * Trigger downooad of manifest.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    downloadFileManifest$: Observable<Action> = this.actions$
        .ofType(ACTIONS.REQUEST_DOWNLOAD_FILE_MANIFEST)
        .switchMap(() => {
            // return selectSelectedFileFacets(this.store).first();
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((query) => {
            return this.fileService.downloadFileManifest(query);
        })
        .map(() => {
            return new ReceiveDownloadFileManifestAction();
        });


    /**
     * Fetch Metadata For File Facets
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchFacetMetadata$: Observable<Action> = this.actions$
        .ofType(ACTIONS.FILE_FACET_METADATA_SUMMARY_REQUESTED)
        .switchMap((action) => {
            return this.fileService.fetchFileFacetMetadata();
        }, (action, fileFacetMetadata: FileFacetMetadata[]) => {
            return new FileFacetMetadataSummaryReceivedAction(fileFacetMetadata);
        });


    /**
     * PRIVATES
     */

    /**
     * Fetch Ordered File Facets
     *
     * @param selectedFacets
     * @returns {Observable<FileFacet[]>}
     */
    private fetchOrderedFileFacets(selectedFacets: Map<string, FileFacet>): Observable<FileFacet[]> {
        const sortOrderLoaded$ = this.store.select(selectFileFacetMetadataSummary).filter(state => !state.loading);
        // const sortOrderLoaded$: Observable<boolean> = selectFileFacetMetadataSummaryLoading(this.store).filter(loading => !loading);
        const sortOrder$ = this.store.select(selectFileFacetMetadataSummary)
            .map(state => state.sortOrder)
            .combineLatest(sortOrderLoaded$, (sortOrder) => sortOrder);

        // const sortOrder$: Observable<string[]> = selectFileFacetsSortOrder(this.store).combineLatest(sortOrderLoaded$, (sortOrder) => sortOrder);

        return this.fileService
            .fetchFileFacets(selectedFacets)
            .combineLatest(sortOrder$, (fileFacets: FileFacet[], sortOrder: string[]) => {

                if (!sortOrder || !sortOrder.length) {
                    return fileFacets;
                }

                return sortOrder.map((sortName) => {
                    return _.find(fileFacets, { name: sortName });
                });
            });
    }
}
