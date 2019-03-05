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
    SelectFileFacetAction, SelectProjectAction,
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

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {FilesService} fileService
     * @param {MatrixService} matrixService
     * @param {ProjectService} projectService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private fileService: FilesService,
                private matrixService: MatrixService,
                private projectService: ProjectService) {
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
     * Fetch data to populate facet menus, facet summary and potentially table data. If we are currently on the projects
     * tab with a selected project, table data is fetched separately.
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

            const entitySearchResults = this.fileService.fetchEntitySearchResults(
                tableQueryParams.selectedFacets,
                DEFAULT_TABLE_PARAMS,
                tableQueryParams.tableState.selectedEntity);

            // We need both table params and search entity results to determine if we need to query for table data
            // separately
            return Observable.forkJoin(Observable.of(tableQueryParams), entitySearchResults);
        })
        .switchMap((results) => { // tableQueryParams, entitySearchResults

            // If the current entity is not projects, or if the current entity is projects but there is no project
            // term selected, we can use the data returned from the entity search to populate the table. If we're on
            // the projects tab and there is a project selected, we need to re-query for data to populate the table
            // as the table is not restricted by any selected projects, in this case.
            const tableQueryParams = results[0];
            const selectedEntity = tableQueryParams.tableState.selectedEntity;
            const facetsByName = tableQueryParams.selectedFacets;
            const entitySearchResults = results[1];

            let tableAction;
            if ( selectedEntity === "projects" && this.isAnyProjectSelected(facetsByName) ) {
                tableAction = Observable.of(new FetchInitialTableDataRequestAction());
            }
            else {
                const tableModel = entitySearchResults.tableModel;
                tableAction = Observable.of(new FetchTableDataSuccessAction(tableModel));
            }

            const fileFacets = entitySearchResults.fileFacets;
            return Observable.concat(
                Observable.of(new FetchFileFacetsSuccessAction(fileFacets)),
                tableAction
            );
        });

    /**
     * Fetch data to populate entity table.
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

            const selectedFacetsByName = tableQueryParams.selectedFacets;
            const selectedEntity = tableQueryParams.tableState.selectedEntity;
            return this.fileService.fetchEntitySearchResults(
                selectedFacetsByName, tableParams, selectedEntity, (selectedEntity !== "projects"));
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

    /**
     * Sort order or page size of entity table has been updated, update search results.
     *
     * @type {Observable<FetchTableDataSuccessAction>}
     */
    @Effect()
    fetchPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(FetchPagedOrSortedTableDataRequestAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {

            const selectedFacetsByName = results[1].selectedFacets;
            const tableParams = (results[0] as FetchPagedOrSortedTableDataRequestAction).tableParams;
            const selectedEntity = results[1].tableState.selectedEntity;
            return this.fileService.fetchEntitySearchResults(
                selectedFacetsByName, tableParams, selectedEntity, (selectedEntity !== "projects"));
        })
        .map((entitySearchResults: EntitySearchResults) => {
            return new FetchTableDataSuccessAction(entitySearchResults.tableModel);
        });

    /**
     * Grab the next page of table result set.
     *
     * @type {Observable<TableNextPageSuccessAction>}
     */
    @Effect()
    fetchNextPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(TableNextPageAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {

            const selectedFacetsByName = results[1].selectedFacets;
            const tableParams = (results[0] as TableNextPageAction).tableParams;
            const selectedEntity = results[1].tableState.selectedEntity;
            return this.fileService.fetchEntitySearchResults(
                selectedFacetsByName, tableParams, selectedEntity, (selectedEntity !== "projects"));
        })
        .map((entitySearchResults: EntitySearchResults) => {
            return new TableNextPageSuccessAction(entitySearchResults.tableModel);
        });

    /**
     * Grab the previous page of table result set.
     *
     * @type {Observable<TablePreviousPageSuccessAction>}
     */
    @Effect()
    fetchPreviousPagedOrSortedTableData$: Observable<Action> = this.actions$
        .ofType(TablePreviousPageAction.ACTION_TYPE)
        .withLatestFrom(this.store.select(selectTableQueryParams))
        .switchMap((results) => {

            const selectedFacetsByName = results[1].selectedFacets;
            const tableParams = (results[0] as TablePreviousPageAction).tableParams;
            const selectedEntity = results[1].tableState.selectedEntity;
            return this.fileService.fetchEntitySearchResults(
                selectedFacetsByName, tableParams, selectedEntity, (selectedEntity !== "projects"));
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

            // Return an array of actions that need to be dispatched - fetch success action, and then a re-request
            // for file summary and table data.
            return Observable.concat(
                // Request summary
                Observable.of(new FetchFileSummaryRequestAction()),
                // Request facets
                Observable.of(new FetchFileFacetsRequestAction())
            );
        });

    /**
     * Trigger fetch of facets and summary counts on select of project.
     *
     * @type {Observable<Action>}
     */
    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .ofType(
            SelectProjectAction.ACTION_TYPE
        )
        .switchMap(() => {

            // Return an array of actions that need to be dispatched - request for file summary and file facets.
            return Observable.concat(
                // Request summary
                Observable.of(new FetchFileSummaryRequestAction()),
                // Request facets
                Observable.of(new FetchFileFacetsRequestAction())
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

    /**
     * Returns true if there is currently any projects in the selected set of facet terms.
     *
     * @param {Map<string, FileFacet>} facetsByName
     * @returns {boolean}
     */
    isAnyProjectSelected(facetsByName: Map<string, FileFacet>): boolean {

        const projectFacet = facetsByName.get("project");
        if ( !projectFacet ) {
            return false;
        }

        return projectFacet.selectedTerms.length > 0;
    }
}
