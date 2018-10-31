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
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/from";
import * as _ from "lodash";

// App dependencies
import { FilesService } from "../shared/files.service";
import { FileSummary } from "../file-summary/file-summary";
import {
    ClearSelectedTermsAction,
    FetchFileFacetsRequestAction,
    FetchFileFacetsSuccessAction, FetchUnfacetedFileFacetsRequestAction,
    NoOpAction,
    SelectFileFacetAction,
    SetViewStateAction, FetchUnfacetedFileFacetsSuccessAction
} from "./file-facet-list/file-facet-list.actions";
import {
    FetchFileSummaryRequestAction,
    FetchFileSummarySuccessAction,
    FetchUnfacetedFileSummaryRequestAction,
    FetchUnfacetedFileSummarySuccessAction
} from "./file-summary/file-summary.actions";
import {
    DownloadFileManifestAction,
    FetchFileManifestSummaryRequestAction,
    FetchFileManifestSummarySuccessAction
} from "./file-manifest-summary/file-manifest-summary.actions";
import { FileFacet } from "../shared/file-facet.model";
import {
    selectFileFacetMetadataSummary,
    selectSelectedEntity,
    selectSelectedFacetsMap,
    selectSelectedFileFacets,
    selectTableQueryParams
} from "app/files/_ngrx/file.selectors";
import { AppState } from "../../_ngrx/app.state";
import {
    EntitySelectAction,
    FetchInitialTableDataRequestAction,
    FetchPagedOrSortedTableDataRequestAction, FetchProjectRequestAction, FetchProjectSuccessAction,
    FetchTableDataSuccessAction,
    TableNextPageAction,
    TableNextPageSuccessAction,
    TablePreviousPageAction,
    TablePreviousPageSuccessAction
} from "./table/table.actions";
import { TableModel } from "../table/table.model";
import { DEFAULT_TABLE_PARAMS } from "../table/table-params.model";
import "rxjs/add/operator/do";
import { getSelectedTable } from "./table/table.state";
import { Project } from "../shared/project.model";
import { ProjectService } from "../shared/project.service";

@Injectable()
export class FileEffects {

    // Locals
    private colors: string[];
    private colorWheel: Map<string, string>;
    private colorWheelSet: boolean;

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {FilesService} fileService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private fileService: FilesService,
                private projectService: ProjectService) {

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
     * Fetch file facets
     */

    /**
     * Trigger update of file summary if a facet changes (ie term is selected or deselected. File summary includes the
     * donor count, file count etc that is displayed above the facets.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchSummary$: Observable<Action> = this.actions$
        .ofType(FetchFileSummaryRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((selectedFacets) => {
            return this.fileService.fetchFileSummary(selectedFacets);
        })
        .map((fileSummary: any) => {

            const fileTypeSummary = fileSummary.fileTypeSummary;

            return {
                donorCount: fileSummary.donorCount,
                fileCount: fileSummary.fileCount,
                fileTypeSummaries: fileSummary.fileTypeSummaries,
                organCount: fileSummary.organCount,
                projectCount: fileSummary.projectCount,
                specimenCount: fileSummary.specimenCount,
                totalCellCount: fileSummary.totalCellCount,
                totalFileSize: fileSummary.totalFileSize
            };
        })
        .map((fileSummary: FileSummary) => {

            if ( typeof fileSummary.totalFileSize === "string" ) {
                fileSummary.totalFileSize = 0;
            }

            return new FetchFileSummarySuccessAction(fileSummary);
        });

    /**
     * Trigger fetch and display of manifest summary once manifest is requested.
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
     * Fetch the initial table data.
     * @type {Observable<FetchTableDataSuccessAction>}
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
                {
                    size: tableQueryParams.pagination.size,
                    sort: tableQueryParams.pagination.sort,
                    order: tableQueryParams.pagination.order
                });

            return this.fileService.fetchEntityTableData(
                tableQueryParams.selectedFacets,
                tableParams,
                tableQueryParams.tableState.selectedEntity);
        })
        .map((tableModel: TableModel) => {
            return new FetchTableDataSuccessAction(tableModel);
        });

    /**
     * Trigger fetch and display of project, when selected from the project table.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchProject: Observable<Action> = this.actions$
        .ofType(FetchProjectRequestAction.ACTION_TYPE)
        .switchMap((action: FetchProjectRequestAction) => {
            return this.projectService.fetchProjectById(action.projectId);
        })
        .map((project: Project) => {
            return new FetchProjectSuccessAction(project);
        });

    /**
     * Fetch overall (original state) of file facets that are unaffected by any selected facets.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchUnfacetedFacets: Observable<Action> = this.actions$
        .ofType(FetchUnfacetedFileFacetsRequestAction.ACTION_TYPE)
        .switchMap(() => {

            return this.fetchOrderedFileFacets(new Map(), "files");
        })
        .map((fileFacets) => {

            return new FetchUnfacetedFileFacetsSuccessAction(fileFacets);
        });

    /**
     * Fetch overall (original state) of file summary that is unaffected by any selected facets.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchUnfacetedSummary: Observable<Action> = this.actions$
        .ofType(FetchUnfacetedFileSummaryRequestAction.ACTION_TYPE)
        .switchMap(() => {

            return this.fileService.fetchFileSummary();
        })
        .map((fileSummary: any) => {

            return {
                donorCount: fileSummary.donorCount,
                fileCount: fileSummary.fileCount,
                fileTypeSummaries: fileSummary.fileTypeSummaries,
                organCount: fileSummary.organCount,
                projectCount: fileSummary.projectCount,
                specimenCount: fileSummary.specimenCount,
                totalCellCount: fileSummary.totalCellCount,
                totalFileSize: fileSummary.totalFileSize
            };
        })
        .map((fileSummary: FileSummary) => {

            if ( typeof fileSummary.totalFileSize === "string" ) {
                fileSummary.totalFileSize = 0;
            }

            return new FetchUnfacetedFileSummarySuccessAction(fileSummary);
        });

    /**
     * Handle action where tab is selected (eg Specimens or Files).
     *
     * @type {Observable<NoOpAction | FetchFileFacetsRequestAction>}
     */
    @Effect()
    switchTabs: Observable<Action> = this.actions$
        .ofType(EntitySelectAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectTableQueryParams).first();
        }).map((params) => {

            // Return cached table, if available
            if ( getSelectedTable(params.tableState).data.length ) {
                return new NoOpAction();
            }

            // Table data has not been previously loaded, load with the facets with counts for the selected entity.
            return new FetchFileFacetsRequestAction();
        });

    @Effect()
    fetchPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(FetchPagedOrSortedTableDataRequestAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {
            return this.fileService.fetchEntityTableData(
                results[1].selectedFacets,
                (results[0] as FetchPagedOrSortedTableDataRequestAction).tableParams,
                results[1].tableState.selectedEntity);
        })
        .map((tableModel: TableModel) => {
            return new FetchTableDataSuccessAction(tableModel);
        });

    @Effect()
    fetchNextPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(TableNextPageAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {
            return this.fileService.fetchEntityTableData(
                results[1].selectedFacets,
                (results[0] as TableNextPageAction).tableParams,
                results[1].tableState.selectedEntity);
        })
        .map((tableModel: TableModel) => {
            return new TableNextPageSuccessAction(tableModel);
        });

    @Effect()
    fetchPreviousPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(TablePreviousPageAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {
            return this.fileService.fetchEntityTableData(
                results[1].selectedFacets,
                (results[0] as TablePreviousPageAction).tableParams,
                results[1].tableState.selectedEntity);
        })
        .map((tableModel: TableModel) => {
            return new TablePreviousPageSuccessAction(tableModel);
        });

    /**
     * Trigger download of manifest.
     * @type {Observable<Action>}
     */
    @Effect({dispatch: false})
    downloadFileManifest$: Observable<Action> = this.actions$
        .ofType(DownloadFileManifestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((query) => {
            return this.fileService.downloadFileManifest(query);
        });

    /**
     * Trigger fetch of facets, summary counts and the table. This executes:
     * 1. on initial set up of app state from URL params
     * 2. on any change of the facet terms (either select or clear all)
     *
     * @type {Observable<Action>}
     */
    @Effect()
    initFacets$: Observable<Action> = this.actions$
        .ofType(
            SetViewStateAction.ACTION_TYPE, // Setting up app state from URL params
            SelectFileFacetAction.ACTION_TYPE, // Selecting facet term eg file type "matrix"
            ClearSelectedTermsAction.ACTION_TYPE, // Clear all selected terms
            FetchFileFacetsRequestAction.ACTION_TYPE // Fetch all facets (need to re-query for facets as counts change as terms are selected)
        )
        .switchMap(() => {

            // Grab the current selected facets and entity
            return Observable.forkJoin(
                this.store.select(selectSelectedFacetsMap).first(), // Selected facets (eg file type "matrix")
                this.store.select(selectSelectedEntity).first() // Files vs specimen vs project (ie selected tab)
            );
        })
        .switchMap((result) => {

            const selectedFacetsMap = result[0];
            const selectedEntity = result[1];

            // Return an array of actions that need to be dispatched - fetch success action, and then a re-request
            // for file summary and table data.
            return Observable.concat(
                // Update table data to match selected terms, if any TODO why does order matter here? code is more readable if this is grouped with the FetchFielSummaryRequestAction below but then action is not triggered correctly?
                // Request Summary
                Observable.of(new FetchFileSummaryRequestAction()),
                // Request Table Data
                Observable.of(new FetchInitialTableDataRequestAction()),
                // Request facets and sort by metadata, map file facet terms to unique colors, to enable graphing of
                // terms (graphs not currently implemented in this instance of the browser).
                this.fetchOrderedFileFacets(selectedFacetsMap, selectedEntity.key)
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
     * Privates
     */

    /**
     * Fetch ordered file facets
     *
     * @param selectedFacets
     * @param {string} tab
     * @returns {Observable<FileFacet[]>}
     */
    private fetchOrderedFileFacets(selectedFacets: Map<string, FileFacet>, tab: string): Observable<FileFacet[]> {

        const sortOrderLoaded$ = this.store.select(selectFileFacetMetadataSummary);

        const sortOrder$ = this.store.select(selectFileFacetMetadataSummary)
            .map(state => state.sortOrder)
            .combineLatest(sortOrderLoaded$, (sortOrder) => sortOrder);

        return this.fileService
            .fetchOrderedFileFacets(selectedFacets, tab)
            .combineLatest(sortOrder$, (fileFacets: FileFacet[], sortOrder: string[]) => {

                // TODO why do we need to filter out null facets here?
                fileFacets = fileFacets.filter((facet) => {
                    return !!facet;
                });

                if ( !sortOrder || !sortOrder.length ) {
                    return fileFacets;
                }

                let newFileFacets = sortOrder.map((sortName) => {
                    return _.find(fileFacets, {name: sortName});
                });

                // order may contain facets that do not exist so filter out any nulls.
                newFileFacets = newFileFacets.filter((facet) => {
                    return !!facet;
                });

                return newFileFacets;

            });
    }
}
