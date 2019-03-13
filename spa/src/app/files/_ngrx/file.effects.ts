/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File-related effects, including fetching file summary (eg total counts), file facets, terms etc.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, mergeMap, switchMap, take, withLatestFrom } from "rxjs/operators";

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
     * Trigger download of manifest.
     */
    @Effect()
    downloadFileManifest$: Observable<Action> = this.actions$
        .pipe(
            ofType(DownloadFileManifestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectFileFacets),
                take(1)
            )),
            switchMap((query) => this.fileService.downloadFileManifest(query)),
            map(response => new DownloadFileManifestRequestedAction(response))
        );

    /**
     * Fetch data to populate facet menus, facet summary and potentially table data. If we are currently on the projects
     * tab with a selected project, table data is fetched separately.
     */
    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileFacetsRequestAction.ACTION_TYPE),
            switchMap((action) => // TODO revisit - can we use withLatestFrom here?
                this.store.pipe(
                    select(selectTableQueryParams),
                    take(1),
                    map((tableQueryParams) => {
                        return {action, tableQueryParams};
                    })
                )
            ),
            switchMap(({action, tableQueryParams}) => {

                const selectedFacetsByName = tableQueryParams.selectedFileFacetsByName;
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                return this.fileService.fetchEntitySearchResults(selectedFacetsByName, DEFAULT_TABLE_PARAMS, selectedEntity)
                    .pipe(
                        map((entitySearchResults) => {
                            return {action, entitySearchResults, tableQueryParams};
                        })
                    );
            }),
            mergeMap((paramsAndEntitySearchResults) => {

                // We need action, table params and search entity results to determine if we need to query for
                // table data separately
                const {action, tableQueryParams, entitySearchResults} = paramsAndEntitySearchResults;

                // Set up fetch success action
                const fileFacets = entitySearchResults.fileFacets;
                const fetchSuccessAction = new FetchFileFacetsSuccessAction(fileFacets);

                // If we don't need to update the table data (eg if this fetch facets is triggered from a select project
                // action), then just emit the fetch facet success action.
                if ( !(action as FetchFileFacetsRequestAction).updateTableData ) {
                    return of(fetchSuccessAction);
                }

                // Otherwise, we need to update the table data:
                // If the current entity is not projects, or if the current entity is projects but there is no project
                // term selected, we can use the data returned from the entity search to populate the table. If we're on
                // the projects tab and there is a project selected, we need to re-query for data to populate the table
                // as the table is not restricted by any selected projects, in this case.
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                const facetsByName = tableQueryParams.selectedFileFacetsByName;
                let tableDataAction;
                if ( selectedEntity === "projects" && this.isAnyProjectSelected(facetsByName) ) {
                    tableDataAction = new FetchInitialTableDataRequestAction();
                }
                else {
                    const tableModel = entitySearchResults.tableModel;
                    tableDataAction = new FetchTableDataSuccessAction(tableModel);
                }

                // Update both facets and table data
                return of(
                    fetchSuccessAction,
                    tableDataAction
                );
            })
        );

    /**
     * Trigger fetch and display of manifest summary once manifest is requested.
     */
    @Effect()
    fetchManifestSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileManifestSummaryRequestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectSelectedFileFacets),
                take(1)
            )),
            switchMap((selectedFacets: FileFacet[]) => this.fileService.fetchFileManifestSummary(selectedFacets)),
            map((fileManifestSummary) => new FetchFileManifestSummarySuccessAction(fileManifestSummary))
        );

    /**
     * Fetch file summary to populate file type summaries on manifest modal. Include all selected facets except any
     * selected file types, in request.
     */
    @Effect()
    fetchManifestDownloadFileSummary: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchManifestDownloadFileSummaryRequestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectSelectedFileFacets),
                take(1)
            )),
            switchMap((selectedFileFacets) => this.fileService.fetchManifestDownloadFileSummary(selectedFileFacets)),
            map((fileSummary: FileSummary) => new FetchManifestDownloadFileSummarySuccessAction(fileSummary))
        );

    /**
     * Trigger fetch and display of matrix file formats.
     */
    @Effect()
    fetchMatrixFileFormats: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchMatrixFileFormatsRequestAction.ACTION_TYPE),
            switchMap(() => this.matrixService.fetchFileFormats()),
            map((fileFormats: string[]) => new FetchMatrixFileFormatsSuccessAction(fileFormats))
        );

    /**
     * Grab the next page of table result set.
     */
    @Effect()
    fetchNextPagedOrSortedTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(TableNextPageAction.ACTION_TYPE),
            withLatestFrom(this.store.pipe(select(selectTableQueryParams))),
            switchMap(this.fetchPagedOrSortedTableData.bind(this)),
            map((entitySearchResults: EntitySearchResults) =>
                new TableNextPageSuccessAction(entitySearchResults.tableModel))
        );

    /**
     * Sort order or page size of entity table has been updated, update search results.
     */
    @Effect()
    fetchPagedOrSortedTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchPagedOrSortedTableDataRequestAction.ACTION_TYPE),
            withLatestFrom(this.store.pipe(select(selectTableQueryParams))),
            switchMap(this.fetchPagedOrSortedTableData.bind(this)),
            map((entitySearchResults: EntitySearchResults) =>
                new FetchTableDataSuccessAction(entitySearchResults.tableModel))
        );

    /**
     * Grab the previous page of table result set.
     */
    @Effect()
    fetchPreviousPagedOrSortedTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(TablePreviousPageAction.ACTION_TYPE),
            withLatestFrom(this.store.pipe(select(selectTableQueryParams))),
            switchMap(this.fetchPagedOrSortedTableData.bind(this)),
            map((entitySearchResults: EntitySearchResults) =>
                new TablePreviousPageSuccessAction(entitySearchResults.tableModel))
        );

    /**
     * Trigger fetch and display of project, when selected from the project table.
     */
    @Effect()
    fetchProject: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectRequestAction.ACTION_TYPE),
            switchMap((action: FetchProjectRequestAction) => this.projectService.fetchProjectById(action.projectId)),
            map((project: Project) => new FetchProjectSuccessAction(project))
        );

    /**
     * Trigger update of file summary if a facet changes (ie term is selected or deselected). File summary includes the
     * donor count, file count etc that is displayed above the facets.
     */
    @Effect()
    fetchSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileSummaryRequestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectSelectedFileFacets),
                take(1)
            )),
            switchMap((selectedFacets: FileFacet[]) => this.fileService.fetchFileSummary(selectedFacets)),
            map((fileSummary: FileSummary) => new FetchFileSummarySuccessAction(fileSummary))
        );

    /**
     * Fetch data to populate entity table.
     */
    @Effect()
    fetchTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchInitialTableDataRequestAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectTableQueryParams),
                take(1)
            )),
            switchMap((tableQueryParams) => {

                // Reset the pagination but keep the set page size if it was changed.
                let tableParams = Object.assign(
                    DEFAULT_TABLE_PARAMS,
                    {
                        size: tableQueryParams.pagination.size,
                        sort: tableQueryParams.pagination.sort,
                        order: tableQueryParams.pagination.order
                    });

                const selectedFacetsByName = tableQueryParams.selectedFileFacetsByName;
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                return this.fileService.fetchEntitySearchResults(
                    selectedFacetsByName, tableParams, selectedEntity, (selectedEntity !== "projects"));
            }),
            map((entitySearchResults: EntitySearchResults) =>
                new FetchTableDataSuccessAction(entitySearchResults.tableModel))
        );

    /**
     * Trigger fetch of facets, summary counts and the table. This executes:
     * 1. on initial set up of app state from URL params
     * 2. on any change of the facet terms (either select or clear all)
     */
    @Effect()
    initFacets$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                SetViewStateAction.ACTION_TYPE, // Setting up app state from URL params
                SelectFileFacetAction.ACTION_TYPE, // Selecting facet term eg file type "matrix"
                ClearSelectedTermsAction.ACTION_TYPE, // Clear all selected terms
                InitEntityStateAction.ACTION_TYPE
            ),
            mergeMap(() => {

                // Return an array of actions that need to be dispatched - fetch success action, and then a re-request
                // for file summary and table data.
                return of(
                    // Request summary
                    new FetchFileSummaryRequestAction(),
                    // Request facets
                    new FetchFileFacetsRequestAction(true)
                );
            })
        );

    /**
     * Trigger fetch of facets and summary counts on select of project.
     */
    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                SelectProjectAction.ACTION_TYPE
            ),
            mergeMap(() => {

                // Return an array of actions that need to be dispatched - request for file summary and file facets.
                return of(
                    // Request summary
                    new FetchFileSummaryRequestAction(),
                    // Request facets
                    new FetchFileFacetsRequestAction(false)
                );
            })
        );

    /**
     * Handle action where tab is selected (eg Specimens or Files).
     */
    @Effect()
    switchTabs: Observable<Action> = this.actions$
        .pipe(
            ofType(EntitySelectAction.ACTION_TYPE),
            switchMap(() => this.store.pipe(
                select(selectTableQueryParams),
                take(1)
            )),
            map((tableQueryParams) => {

                // Return cached table, if available
                if ( getSelectedTable(tableQueryParams.tableState).data.length ) {
                    return new NoOpAction();
                }

                // Table data has not been previously loaded and is therefore not cached.
                return new InitEntityStateAction();
            })
        );

    /**
     * Privates
     */

    /**
     * Fetch the paged/sorted table data and map to appropriate format for FE.
     *
     * @param {[FetchPagedOrSortedTableDataRequestAction | TableNextPageAction | TablePreviousPageAction,
     * Map<string, FileFacet> & PaginationModel & TableState]} [action, tableQueryParams]
     * @returns {Observable<EntitySearchResults>}
     */
    private fetchPagedOrSortedTableData([action , tableQueryParams]): Observable<EntitySearchResults> {

        const selectedFacetsByName = tableQueryParams.selectedFileFacetsByName;
        const tableParams = action.tableParams;
        const selectedEntity = tableQueryParams.tableState.selectedEntity;
        return this.fileService.fetchEntitySearchResults(
            selectedFacetsByName, tableParams, selectedEntity, (selectedEntity !== "projects"));
    }

    /**
     * Returns true if there is currently any projects in the selected set of facet terms.
     *
     * @param {Map<string, FileFacet>} facetsByName
     * @returns {boolean}
     */
    private isAnyProjectSelected(facetsByName: Map<string, FileFacet>): boolean {

        const projectFacet = facetsByName.get("project");
        if ( !projectFacet ) {
            return false;
        }

        return projectFacet.selectedTerms.length > 0;
    }
}
