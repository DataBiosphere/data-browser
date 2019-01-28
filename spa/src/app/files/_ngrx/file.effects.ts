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
import "rxjs/add/operator/do";
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
import { FetchMatrixFileFormatsRequestAction, FetchMatrixFileFormatsSuccessAction } from "./matrix/matrix.actions";
import { FileSummary } from "../file-summary/file-summary";
import { FilesService } from "../shared/files.service";
import {
    ClearSelectedTermsAction,
    FetchFileFacetsRequestAction,
    FetchFileFacetsSuccessAction, InitEntityStateAction,
    NoOpAction,
    SelectFileFacetAction,
    SetViewStateAction
} from "./file-facet-list/file-facet-list.actions";
import {
    FetchFileSummaryRequestAction,
    FetchFileSummarySuccessAction,
    FetchManifestDownloadFileSummaryRequestAction,
    FetchManifestDownloadFileSummarySuccessAction
} from "./file-summary/file-summary.actions";
import {
    DownloadFileManifestAction, DownloadFileManifestRequestedAction,
    FetchFileManifestSummaryRequestAction,
    FetchFileManifestSummarySuccessAction
} from "./file-manifest-summary/file-manifest-summary.actions";
import {
    selectFileFacets,
    selectFileFacetMetadataSummary,
    selectSelectedEntity,
    selectSelectedFacetsMap,
    selectSelectedFileFacets,
    selectTableQueryParams
} from "app/files/_ngrx/file.selectors";
import { AppState } from "../../_ngrx/app.state";
import { EntitySearchResults } from "../shared/entity-search-results.model";
import { FileFacet } from "../shared/file-facet.model";
import { MatrixService } from "../shared/matrix.service";
import { Project } from "../shared/project.model";
import { ProjectService } from "../shared/project.service";
import { DEFAULT_TABLE_PARAMS } from "../table/table-params.model";
import { getSelectedTable } from "./table/table.state";
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
                private matrixService: MatrixService,
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
     * Trigger update of file summary if a facet changes (ie term is selected or deselected). File summary includes the
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
     * Fetch data to populate facet menus.
     *
     * @type {Observable<FetchFileFacetsSuccessAction>}
     */
    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .ofType(FetchFileFacetsRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectTableQueryParams).first();
        })
        .switchMap((tableQueryParams) => {

            return this.fileService.fetchEntitySearchResults(
                tableQueryParams.selectedFacets,
                DEFAULT_TABLE_PARAMS,
                tableQueryParams.tableState.selectedEntity);
        })
        .map((entitySearchResults: EntitySearchResults) => {

            // Update term color indicators for potential charting of term count %
            const fileFacets = entitySearchResults.fileFacets;
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
        });

    /**
     * Fetch the initial table data.
     *
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

            // Remove any selected project facets if user is currently viewing project tab. We do not want to restrict table
            // result set to just the selected project facets.
            const selectedEntity = tableQueryParams.tableState.selectedEntity;
            const filteredSelectedFacets = new Map(tableQueryParams.selectedFacets);
            if ( filteredSelectedFacets.has("project") ) {
                filteredSelectedFacets.delete("project");
            }
            return this.fileService.fetchEntitySearchResults(
                filteredSelectedFacets,
                tableParams,
                selectedEntity);
        })
        .map((entitySearchResults: EntitySearchResults) => {

            return new FetchTableDataSuccessAction(entitySearchResults.tableModel);
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
     * Fetch file summary to populate file type summaries on manifest modal. Include all selected facets except any
     * selected file types, in request.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchManifestDownloadtFileSummary: Observable<Action> = this.actions$
        .ofType(FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectSelectedFileFacets).first();
        })
        .switchMap((selectedFileFacets) => {

            return this.fileService.fetchManifestDownloadFileSummary(selectedFileFacets);
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

            return new FetchManifestDownloadFileSummarySuccessAction(fileSummary);
        });

    /**
     * Trigger fetch and display of matrix file formats.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    fetchMatrixFileFormats: Observable<Action> = this.actions$
        .ofType(FetchMatrixFileFormatsRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.matrixService.fetchFileFormats();
        })
        .map((fileFormats: string[]) => {
            return new FetchMatrixFileFormatsSuccessAction(fileFormats);
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

            // Table data has not been previously loaded and is therefore not cached.
            return new InitEntityStateAction();
        });

    @Effect()
    fetchPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(FetchPagedOrSortedTableDataRequestAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {
            return this.fileService.fetchEntitySearchResults(
                results[1].selectedFacets,
                (results[0] as FetchPagedOrSortedTableDataRequestAction).tableParams,
                results[1].tableState.selectedEntity);
        })
        .map((entitySearchResults: EntitySearchResults) => {
            return new FetchTableDataSuccessAction(entitySearchResults.tableModel);
        });

    @Effect()
    fetchNextPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(TableNextPageAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {
            return this.fileService.fetchEntitySearchResults(
                results[1].selectedFacets,
                (results[0] as TableNextPageAction).tableParams,
                results[1].tableState.selectedEntity);
        })
        .map((entitySearchResults: EntitySearchResults) => {
            return new TableNextPageSuccessAction(entitySearchResults.tableModel);
        });

    @Effect()
    fetchPreviousPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(TablePreviousPageAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {
            return this.fileService.fetchEntitySearchResults(
                results[1].selectedFacets,
                (results[0] as TablePreviousPageAction).tableParams,
                results[1].tableState.selectedEntity);
        })
        .map((entitySearchResults: EntitySearchResults) => {
            return new TablePreviousPageSuccessAction(entitySearchResults.tableModel);
        });

    /**
     * Trigger download of manifest.
     * @type {Observable<Action>}
     */
    @Effect({dispatch: false})
    downloadFileManifest$: Observable<Action> = this.actions$
        .ofType(DownloadFileManifestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.store.select(selectFileFacets).first();
        })
        .switchMap((query) => {
            return this.fileService.downloadFileManifest(query);
        })
        .map(response => {
            return new DownloadFileManifestRequestedAction(response);
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
            InitEntityStateAction.ACTION_TYPE
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
                // Request summary
                Observable.of(new FetchFileSummaryRequestAction()),
                // Request facets
                Observable.of(new FetchFileFacetsRequestAction()),
                // Request table data
                Observable.of(new FetchInitialTableDataRequestAction())
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
