/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
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
import { SetViewStateAction } from "./file-facet-list/set-view-state.action";
import { FileSummary } from "../file-summary/file-summary";
import {
    FetchFileFacetsRequestAction,
    FetchFileFacetsSuccessAction, InitEntityStateAction,
    NoOpAction
} from "./file-facet-list/file-facet-list.actions";
import {
    FetchFileSummaryRequestAction,
    FetchFileSummarySuccessAction
} from "./file-summary/file-summary.actions";
import {
    selectTableQueryParams
} from "app/files/_ngrx/file.selectors";
import { FetchMatrixFileFormatsRequestAction, FetchMatrixFileFormatsSuccessAction } from "./matrix/matrix.actions";
import { AppState } from "../../_ngrx/app.state";
import { ClearSelectedTermsAction } from "./search/clear-selected-terms.action";
import { SelectFileFacetTermAction } from "./search/select-file-facet-term.action";
import { SearchTerm } from "../search/search-term.model";
import { selectSelectedSearchTerms } from "./search/search.selectors";
import { SelectProjectIdAction } from "./search/select-project-id.action";
import { EntityName } from "../shared/entity-name.model";
import { EntitySearchResults } from "../shared/entity-search-results.model";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetName } from "../shared/file-facet-name.model";
import { FilesService } from "../shared/files.service";
import { MatrixService } from "../shared/matrix.service";
import { Project } from "../shared/project.model";
import { ProjectService } from "../shared/project.service";
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
import { DEFAULT_TABLE_PARAMS } from "../table/table-params.model";
import { getSelectedTable } from "./table/table.state";
import { SearchTermsUpdatedAction } from "./search/search-terms-updated-action.action";

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
     * Fetch data to populate facet menus, facet summary and potentially table data. If we are currently on the projects
     * tab with a selected project, table data is fetched separately.
     */
    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileFacetsRequestAction.ACTION_TYPE),
            switchMap((action) =>
                this.store.pipe(
                    select(selectTableQueryParams),
                    take(1),
                    map((tableQueryParams) => {
                        return {action, tableQueryParams};
                    })
                )
            ),
            switchMap(({action, tableQueryParams}) => {

                const selectedSearchTermsBySearchKey = tableQueryParams.selectedSearchTermsBySearchKey;
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                let tableParams = Object.assign(
                    DEFAULT_TABLE_PARAMS,
                    {
                        sort: tableQueryParams.pagination.sort,
                        order: tableQueryParams.pagination.order
                    });
                
                return this.fileService.fetchEntitySearchResults(selectedSearchTermsBySearchKey, tableParams, selectedEntity)
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
                
                // Set up search term action
                const searchTermUpdatedAction = new SearchTermsUpdatedAction(entitySearchResults.searchTerms);

                // If we don't need to update the table data (eg if this fetch facets is triggered from a select project
                // action), then just emit actions to update facets and search.
                if ( !(action as FetchFileFacetsRequestAction).updateTableData ) {
                    return of(
                        fetchSuccessAction,
                        searchTermUpdatedAction
                    );
                }

                // Otherwise, we need to update the table data:
                // If the current entity is not projects, or if the current entity is projects but there is no project
                // term selected, we can use the data returned from the entity search to populate the table. If we're on
                // the projects tab and there is a project selected, we need to re-query for data to populate the table
                // as the table is not restricted by any selected projects, in this case.
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                const searchTermsBySearchKey = tableQueryParams.selectedSearchTermsBySearchKey;
                let tableDataAction;
                if ( selectedEntity === EntityName.PROJECTS && this.isAnyProjectSelected(searchTermsBySearchKey) ) {
                    tableDataAction = new FetchInitialTableDataRequestAction();
                }
                else {
                    const tableModel = entitySearchResults.tableModel;
                    tableDataAction = new FetchTableDataSuccessAction(tableModel);
                }

                // Update both facets and table data
                return of(
                    fetchSuccessAction,
                    searchTermUpdatedAction,
                    tableDataAction
                );
            })
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
                select(selectSelectedSearchTerms),
                take(1)
            )),
            switchMap((searchTerms: SearchTerm[]) => this.fileService.fetchFileSummary(searchTerms)),
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

                const selectedSearchTermsBySearchKey = tableQueryParams.selectedSearchTermsBySearchKey;
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                return this.fileService.fetchEntitySearchResults(
                    selectedSearchTermsBySearchKey, tableParams, selectedEntity, (selectedEntity !== EntityName.PROJECTS));
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
                SelectFileFacetTermAction.ACTION_TYPE, // Selecting facet term eg file type "matrix"
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
                SelectProjectIdAction.ACTION_TYPE
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

        const selectedSearchTermsByFacetName = tableQueryParams.selectedSearchTermsBySearchKey;
        const tableParams = action.tableParams;
        const selectedEntity = tableQueryParams.tableState.selectedEntity;
        return this.fileService.fetchEntitySearchResults(
            selectedSearchTermsByFacetName, tableParams, selectedEntity, (selectedEntity !== EntityName.PROJECTS));
    }

    /**
     * Returns true if there is currently any projects in the current search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @returns {boolean}
     */
    private isAnyProjectSelected(searchTermsByFacetName: Map<string, Set<SearchTerm>>): boolean {

        return searchTermsByFacetName.has(FileFacetName.PROJECT) || searchTermsByFacetName.has(FileFacetName.PROJECT_ID);
    }
}
