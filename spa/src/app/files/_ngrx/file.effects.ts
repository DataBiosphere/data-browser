/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File-related effects, including fetching file summary (eg total counts), file facets, terms etc.
 */

// Core dependencies
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
import "rxjs/add/operator/withLatestFrom";
import * as _ from "lodash";

// App dependencies
import { FilesService } from "../shared/files.service";
import { FileSummary } from "../file-summary/file-summary";
import { FileFacetMetadata } from "../file-facet-metadata/file-facet-metadata.model";
import {
    FetchFileFacetsRequestAction,
    FetchFileFacetsSuccessAction,
    SelectFileFacetAction
} from "./file-facet-list/file-facet-list.actions";
import { FetchFileSummaryRequestAction, FetchFileSummarySuccessAction } from "./file-summary/file-summary.actions";
import {
    DownloadFileManifestAction,
    FetchFileManifestSummaryRequestAction,
    FetchFileManifestSummarySuccessAction
} from "./file-manifest-summary/file-manifest-summary.actions";
import { FileFacet } from "../shared/file-facet.model";
import {
    selectFileFacetMetadataSummary,
    selectSelectedFacetsMap,
    selectSelectedFileFacets,
    selectTableQueryParams
} from "app/files/_ngrx/file.selectors";
import { AppState } from "../../_ngrx/app.state";
import {
    FetchInitialTableDataRequestAction, FetchPagedOrSortedTableDataRequestAction,
    FetchTableDataSuccessAction
} from "./table/table.actions";
import { TableModel } from "../table/table.model";
import { DEFAULT_TABLE_PARAMS } from "../table/table-params.model";

@Injectable()
export class FileEffects {

    private colorWheelSet: boolean;
    private colors: string[];

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {FilesService} fileService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private fileService: FilesService) {
        this.colorWheel = new Map<string, string>();
        this.colorWheelSet = false;

        this.colors = [
            
            "#172984",
            "#4A90E2",
            "#24D1F2",
            "#B8A2E3",
            "#E1B5EC",
            "#EC5C6D",
            "#FF6C19",
            "#FFA560",
            "#FFDD88", 
            "#FFBABA", 
            "#FFD2AF", 
            "#F8FEC1",
            
            // TODO revisit - will need to re-enable this for BW instances
            // "#1A535C",
            // "#4CC9C0",
            // "#5C83D0",
            // "#FF6B6B",
            // "#FFA560",
            // "#FFE66D",
            // "#113871", // dark blue
            // "#336C74", // light green
            // "#ABF0EB", // light turquoise
            // "#B3C9F2", // light light purple
            // "#B6D67E", // lime green
            // "#BE5951", // salmon
            // "#FFBABA", // light peach
            // "#FFD2AF", // light orange
            "#eeeeee"
        ];
    }

    /**
     * Effects
     */

    /**
     * Trigger update of file summary if a facet changes (ie term is selected or deseclted. File summary includes the 
     * donor count, file count etc that is displayed above the facets.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchSummary$: Observable<Action> = this.actions$
        .ofType(SelectFileFacetAction.ACTION_TYPE, FetchFileFacetsRequestAction.ACTION_TYPE)
        .switchMap(() => {
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

            return new FetchFileSummarySuccessAction(fileSummary);
        });

    /**
     * Trigger fetch and display of manifest summary once manifest is requested.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchManifestSummary$: Observable<Action> = this.actions$
        .ofType(FetchFileManifestSummaryRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((selectedFacets) => {
            return this.fileService.fetchFileManifestSummary(selectedFacets);
        })
        .map((fileManifestSummary) => {
            return new FetchFileManifestSummarySuccessAction(fileManifestSummary);
        });

    /**
     * 
     */
    @Effect()
    fetchInitialTableData$: Observable<Action> = this.actions$
        .ofType(FetchInitialTableDataRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectTableQueryParams).first();
        })
        .switchMap((tableQueryParams) => {

            // Reset the pagination but keep the set page size if it was changed.
            let tableParams = Object.assign(
                DEFAULT_TABLE_PARAMS,
                {size: tableQueryParams.pagination.size,
                sort: tableQueryParams.pagination.sort,
                order: tableQueryParams.pagination.order});

            return this.fileService.fetchFileTableData(tableQueryParams.selectedFacets, tableParams);
        })
        .map((tableModel: TableModel) => {
            return new FetchTableDataSuccessAction(tableModel);
        });

    /**
     *
     */
    @Effect()
    fetchPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(FetchPagedOrSortedTableDataRequestAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {
            return this.fileService.fetchFileTableData(results[1].selectedFacets, (results[0] as FetchPagedOrSortedTableDataRequestAction).tableParams);
        })
        .map((tableModel: TableModel) => {
            return new FetchTableDataSuccessAction(tableModel);
        });

    /**
     *
     * Trigger downooad of manifest.
     *
     * @type {Observable<Action>}
     */
    @Effect({ dispatch: false })
    downloadFileManifest$: Observable<Action> = this.actions$
        .ofType(DownloadFileManifestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((query) => {
            return this.fileService.downloadFileManifest(query);
        });

    private colorWheel: Map<string, string>;
    
    /**
     * Trigger update of facets once a facet term is selected/deselected.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .ofType(SelectFileFacetAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectSelectedFacetsMap).first();
        })
        .switchMap((selectedFacets) => {

            return Observable.concat(
                Observable.of(new FetchFileSummaryRequestAction()),
                Observable.of(new FetchInitialTableDataRequestAction()),

                // map AND concat?
                this.fetchOrderedFileFacets(selectedFacets)
                    .map((fileFacets) => {

                        fileFacets.forEach((fileFacet) => {

                            fileFacet.terms.forEach((term) => {
                                const key = fileFacet.name + ":" + term.name;
                                term.color = this.colorWheel.get(key);
                            });
                        });
                        return new FetchFileFacetsSuccessAction(fileFacets);
                    })
            );
        });
    
    /**
     * Trigger update of facet counts on init.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    initFacets$: Observable<Action> = this.actions$
        .ofType(FetchFileFacetsRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectSelectedFacetsMap).first();
        })
        .switchMap((selectedFacets) => {
            return Observable.concat(
                // Request Summary
                Observable.of(new FetchFileSummaryRequestAction()),
                // Request Table Data
                Observable.of(new FetchInitialTableDataRequestAction()),
                // Request Facets, and sort by metadata
                this.fetchOrderedFileFacets(selectedFacets)
                    .map((fileFacets: FileFacet[]) => {

                        fileFacets.forEach((fileFacet) => {

                            let colorIndex = 0;
                            fileFacet.terms.forEach((term) => {
                                term.color = this.colors[colorIndex];
                                const key = fileFacet.name + ":" + term.name;
                                this.colorWheel.set(key, term.color);
                                colorIndex++;
                            });
                        });
                        return new FetchFileFacetsSuccessAction(fileFacets);
                    })
            );
        });

    /**
     * PRIVATES
     */

    /**
     * Fetch ordered file facets
     *
     * @param selectedFacets
     * @returns {Observable<FileFacet[]>}
     */
    private fetchOrderedFileFacets(selectedFacets: Map<string, FileFacet>): Observable<FileFacet[]> {
        const sortOrderLoaded$ = this.store.select(selectFileFacetMetadataSummary);

        const sortOrder$ = this.store.select(selectFileFacetMetadataSummary)
            .map(state => state.sortOrder)
            .combineLatest(sortOrderLoaded$, (sortOrder) => sortOrder);

        return this.fileService
            .fetchOrderedFileFacets(selectedFacets)
            .combineLatest(sortOrder$, (fileFacets: FileFacet[], sortOrder: string[]) => {

                // TODO why do we need to filter out null facets here?
                fileFacets = fileFacets.filter((facet) => {
                    return !!facet;
                });

                if (!sortOrder || !sortOrder.length) {
                    return fileFacets;
                }

                let newFileFacets = sortOrder.map((sortName) => {
                    return _.find(fileFacets, { name: sortName });
                });

                // order may contain facets that do not exist so filter out any nulls.
                newFileFacets = newFileFacets.filter((facet) => {
                    return !!facet;
                });

                return newFileFacets;

            });
    }
}
