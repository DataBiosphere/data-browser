/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, map, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { FetchFileFacetsRequestAction } from "../facet/fetch-file-facets-request.action";
import { selectTableQueryParams } from "../file.selectors";
import { FetchFileSummaryRequestAction } from "../file-summary/file-summary.actions";
import { FetchSortedTableDataRequestAction } from "./fetch-sorted-table-data-request.action";
import { FetchTableDataRequestAction } from "./fetch-table-data-request.action";
import { FetchTableDataSuccessAction } from "./fetch-table-data-success.action";
import { FetchTableModelRequestAction } from "./fetch-table-model-request.action";
import { FetchTableModelSuccessAction } from "./fetch-table-model-success.action";
import { AppState } from "../../../_ngrx/app.state";
import { ProjectService } from "../../project/project.service";
import { selectPreviousQuery } from "../search/search.selectors";
import { SelectProjectIdAction } from "../search/select-project-id.action";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { GAIndex } from "../../../shared/analytics/ga-index.model";
import { EntityName } from "../../shared/entity-name.model";
import { EntitySearchResults } from "../../shared/entity-search-results.model";
import { FilesService } from "../../shared/files.service";
import { DEFAULT_TABLE_PARAMS } from "../../table/pagination/table-params.model";
import { TableNextPageAction } from "./table-next-page.action";
import { TableNextPageSuccessAction } from "./table-next-page-success.action";
import { TablePreviousPageAction } from "./table-previous-page.action";
import { TablePreviousPageSuccessAction } from "./table-previous-page-success.action";
import { UrlService } from "../../url/url.service";
import { selectCatalog } from "../catalog/catalog.selectors";

@Injectable()
export class TableEffects {

    /**
     * @param {FilesService} fileService
     * @param {GTMService} gtmService
     * @param {ProjectService} projectService
     * @param {UrlService} urlService
     * @param {Actions} actions$
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    constructor(private fileService: FilesService,
                private gtmService: GTMService,
                private projectService: ProjectService,
                private urlService: UrlService,
                private actions$: Actions,
                private router: Router,
                private store: Store<AppState>) {
    }

    /**
     * Grab the next page of table result set - update table model data (but not the term counts).
     */
    @Effect()
    fetchNextPagedOrSortedTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(TableNextPageAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectTableQueryParams)),
                    this.store.pipe(select(selectPreviousQuery), take(1))
                )
            )),
            switchMap(([action, tableQueryParams, queryWhenActionTriggered]) => {

                // Send tracking event of next page action.
                const index = this.convertSelectedEntityToTrackingIndex(tableQueryParams.tableState.selectedEntity);
                const event = (action as TableNextPageAction).asEvent({
                    currentQuery: queryWhenActionTriggered,
                    index
                });
                this.gtmService.trackEvent(event);

                // Fetch previous page.
                return this.fetchSortedTableModel(action, tableQueryParams);
            }),
            map((entitySearchResults: EntitySearchResults) =>
                new TableNextPageSuccessAction(entitySearchResults.tableModel))
        );

    /**
     * Sort order of entity table has been updated, update table model data (but not the term counts).
     */
    @Effect()
    fetchSortedTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchSortedTableDataRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectTableQueryParams), take(1)),
                    this.store.pipe(select(selectPreviousQuery), take(1))
                )
            )),            
            switchMap(([action, tableQueryParams, queryWhenActionTriggered]) => {

                // Send tracking event of sort action.
                this.gtmService.trackEvent((action as FetchSortedTableDataRequestAction).asEvent({
                    currentQuery: queryWhenActionTriggered
                }));

                // Fetch sorted search results
                return this.fetchSortedTableModel(action, tableQueryParams).pipe(
                    map((entitySearchResults) => {
                        return {entitySearchResults, tableQueryParams};
                    })
                );
            }),
            map(({tableQueryParams, entitySearchResults}) => {

                const termCountsByFacetName = tableQueryParams.tableState.tableModels.find(tableModel => {
                    return tableModel.tableName === tableQueryParams.tableState.selectedEntity;
                }).termCountsByFacetName;
                const tableModel = entitySearchResults.tableModel;
                return new FetchTableDataSuccessAction(tableModel.data, tableModel.pagination, termCountsByFacetName);
            })
        );

    /**
     * Grab the previous page of table result set - update table model data (but not the term counts).
     */
    @Effect()
    fetchPreviousPagedOrSortedTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(TablePreviousPageAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectTableQueryParams)),
                    this.store.pipe(select(selectPreviousQuery), take(1))
                )
            )),
            switchMap(([action, tableQueryParams, queryWhenActionTriggered]) => {

                // Send tracking event of previous page action.
                const index = this.convertSelectedEntityToTrackingIndex(tableQueryParams.tableState.selectedEntity);
                const event = (action as TablePreviousPageAction).asEvent({
                    currentQuery: queryWhenActionTriggered,
                    index
                });
                this.gtmService.trackEvent(event);
                
                // Fetch previous page.
                return this.fetchSortedTableModel(action, tableQueryParams);
            }),
            map((entitySearchResults: EntitySearchResults) =>
                new TablePreviousPageSuccessAction(entitySearchResults.tableModel))
        );

    /**
     * Fetch table data, to update table data and corresponding pagination details. Update to term counts is not required.
     */
    @Effect()
    fetchTableData$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchTableDataRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectTableQueryParams), take(1))
                )
            )),
            switchMap(([action, catalog, tableQueryParams]) => {

                // Reset the pagination but keep the set page size if it was changed.
                let tableParams = Object.assign(
                    {},
                    DEFAULT_TABLE_PARAMS,
                    {
                        size: tableQueryParams.pagination.size,
                        sort: tableQueryParams.pagination.sort,
                        order: tableQueryParams.pagination.order
                    });

                const selectedSearchTermsBySearchKey = tableQueryParams.selectedSearchTermsBySearchKey;
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                const filterableByProject = (selectedEntity !== EntityName.PROJECTS);
                return this.fileService.fetchEntitySearchResults(
                        catalog,    
                        selectedSearchTermsBySearchKey,
                        tableParams,
                        selectedEntity,
                        filterableByProject)
                    .pipe(
                        map((entitySearchResults) => {
                            return {action, entitySearchResults};
                        })
                    );
            }),
            map(({action, entitySearchResults}) =>
                new FetchTableDataSuccessAction(
                    entitySearchResults.tableModel.data,
                    entitySearchResults.tableModel.pagination,
                    (action as FetchTableDataRequestAction).termCountsByFacetName))
        );

    /**
     * Fetch table model, to update table data and corresponding pagination details and term counts.
     */
    @Effect()
    fetchTableModel$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchTableModelRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectTableQueryParams), take(1))
                ))
            ),
            switchMap(([action, catalog, tableQueryParams]) => {

                // Reset the pagination but keep the set page size if it was changed.
                let tableParams = Object.assign(
                    {},
                    DEFAULT_TABLE_PARAMS,
                    {
                        size: tableQueryParams.pagination.size,
                        sort: tableQueryParams.pagination.sort,
                        order: tableQueryParams.pagination.order
                    });

                const selectedSearchTermsBySearchKey = tableQueryParams.selectedSearchTermsBySearchKey;
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                return this.fileService.fetchEntitySearchResults(
                    catalog,
                    selectedSearchTermsBySearchKey,
                    tableParams,
                    selectedEntity,
                    (selectedEntity !== EntityName.PROJECTS));
            }),
            map((entitySearchResults: EntitySearchResults) =>
                new FetchTableModelSuccessAction(entitySearchResults.tableModel))
        );

    /**
     * Trigger fetch of facets and summary counts on select of project.
     */
    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .pipe(
            ofType(SelectProjectIdAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectTableQueryParams)),
                    this.store.pipe(select(selectPreviousQuery), take(1))
                )
            )),
            switchMap(([action, tableQueryParams, queryWhenActionTriggered]) => {

                // Send tracking event.
                const event = (action as SelectProjectIdAction).asEvent({currentQuery: queryWhenActionTriggered});
                this.gtmService.trackEvent(event);

                // Return an array of actions that need to be dispatched - request for file summary and file facets.
                return of(
                    // Request summary
                    new FetchFileSummaryRequestAction(),
                    // Request facets
                    new FetchFileFacetsRequestAction(tableQueryParams.tableState.selectedEntity !== EntityName.PROJECTS)
                );
            })
        );

    /**
     * Convert the selected entity spec key into the corresponding GAIndex value, for tracking.
     * 
     * @param {string} selectedEntityKey
     * @returns {GAIndex}
     */
    private convertSelectedEntityToTrackingIndex(selectedEntityKey: string): GAIndex {

        return GAIndex[selectedEntityKey.toUpperCase()];
    }

    /**
     * Fetch the paged/sorted table data and map to appropriate format for FE.
     *
     * @param {[FetchSortedTableDataRequestAction | TableNextPageAction | TablePreviousPageAction,
     * Map<string, FileFacet> & Pagination & TableState]} action
     * @param {any} tableQueryParams
     * @returns {Observable<EntitySearchResults>}
     */
    private fetchSortedTableModel(action, tableQueryParams): Observable<EntitySearchResults> {

        const selectedSearchTermsByFacetName = tableQueryParams.selectedSearchTermsBySearchKey;
        const tableParams = action.tableParams;
        const selectedEntity = tableQueryParams.tableState.selectedEntity;
        return this.fileService.fetchEntitySearchResults(
            tableQueryParams.catalog,
            selectedSearchTermsByFacetName,
            tableParams,
            selectedEntity,
            (selectedEntity !== EntityName.PROJECTS));
    }
}
