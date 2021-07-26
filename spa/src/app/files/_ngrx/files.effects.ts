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
import { concatMap, distinct, filter, map, mergeMap, switchMap, take, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "./catalog/catalog.selectors";
import { SelectCatalogAction } from "./catalog/select-catalog.action";
import { ClearFilesFacetsAction } from "./facet/clear-files-facets.action";
import { InitEntityStateAction } from "./entity/init-entity-state.action";
import { FetchFacetsSuccessAction } from "./facet/fetch-facets-success-action.action";
import { FetchFileFacetsRequestAction } from "./facet/fetch-file-facets-request.action";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "./facet/set-view-state.action";
import { FetchFilesFacetsRequestAction } from "./facet/fetch-files-facets-request.action";
import { FetchFilesFacetsSuccessAction } from "./facet/fetch-files-facets-success.action";
import { selectTableQueryParams } from "./files.selectors";
import { FileSummary } from "../file-summary/file-summary";
import { FetchFileSummaryRequestAction, FetchFileSummarySuccessAction } from "./file-summary/file-summary.actions";
import { AppState } from "../../_ngrx/app.state";
import { ClearSelectedTermsAction } from "./search/clear-selected-terms.action";
import { SelectFileFacetTermAction } from "./search/select-file-facet-term.action";
import {
    selectCurrentQuery,
    selectIsSelectedTermsLoading,
    selectSelectedProjectSearchTerms,
    selectSelectedSearchTerms
} from "./search/search.selectors";
import { SearchTermsUpdatedAction } from "./search/search-terms-updated.action";
import { SearchTerm } from "../search/search-term.model";
import { SelectFacetAgeRangeAction } from "./search/select-facet-age-range.action";
import { FetchSelectedProjectsSuccessAction } from "./search/fetch-selected-projects-success.action";
import { ClearSelectedAgeRangeAction } from "./search/clear-selected-age-range.action";
import { GTMService } from "../../shared/analytics/gtm.service";
import { EntityName } from "../shared/entity-name.model";
import { FilesService } from "../shared/files.service";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { GACategory } from "../../shared/analytics/ga-category.model";
import { GADimension } from "../../shared/analytics/ga-dimension.model";
import { GAIndex } from "../../shared/analytics/ga-index.model";
import { FetchTableDataRequestAction } from "./table/fetch-table-data-request.action";
import { FetchTableModelSuccessAction } from "./table/fetch-table-model-success.action";
import { DEFAULT_TABLE_PARAMS } from "../table/pagination/table-params.model";
import { TermCountsUpdatedAction } from "./table/term-counts-updated.action";

@Injectable()
export class FilesEffects {

    /**
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {FilesService} fileService
     * @param {GTMService} gtmService
     */
    constructor(private store: Store<AppState>,
                private actions$: Actions,
                private fileService: FilesService,
                private gtmService: GTMService) {
    }

    /**
     * Trigger fetch of facets, summary counts and the table. This executes:
     *
     * 1. on initial set up of app state from URL params
     * 2. on any change of the facet terms (either select or clear all)
     * 3. on switch of tab
     */
    @Effect()
    fetchFacetsAndSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                SelectCatalogAction.ACTION_TYPE, // Dev-specific select of catalog
                ClearSelectedTermsAction.ACTION_TYPE, // Clear all selected terms
                ClearSelectedAgeRangeAction.ACTION_TYPE, // Clear age range
                InitEntityStateAction.ACTION_TYPE, // Init table data for newly selected tab, if table data isn't cached
                SetViewStateAction.ACTION_TYPE, // Setting up app state from URL params
                SelectFileFacetTermAction.ACTION_TYPE, // Selecting facet term eg file type "bam"
                SelectFacetAgeRangeAction.ACTION_TYPE // Setting age range
            ),
            mergeMap(() => {

                // Return an array of actions that need to be dispatched - we need to (re-)request summary and facet
                // (including table) data.
                return of(
                    // Request summary
                    new FetchFileSummaryRequestAction(),
                    // Request facets
                    new FetchFileFacetsRequestAction(true)
                );
            })
        );

    /**
     * Fetch data to populate facet menus, facet summary and potentially table data. If we are currently on the projects
     * tab with a selected project, an additional call to populate the table is called. Track any cases where the result
     * set is empty.
     */
    @Effect()
    fetchFacets$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileFacetsRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectTableQueryParams), take(1)),
                    this.store.pipe(select(selectCurrentQuery), take(1))
                )
            )),
            switchMap(([action, catalog, tableQueryParams, currentQuery]) => {

                const selectedSearchTermsBySearchKey = tableQueryParams.selectedSearchTermsBySearchKey;
                const selectedEntity = tableQueryParams.tableState.selectedEntity;
                let tableParams = Object.assign(
                    {},
                    DEFAULT_TABLE_PARAMS,
                    {
                        sort: tableQueryParams.pagination.sort,
                        order: tableQueryParams.pagination.order
                    });

                return this.fileService.fetchEntitySearchResults(
                    catalog,
                    selectedSearchTermsBySearchKey,
                    tableParams,
                    selectedEntity)
                        .pipe(
                            map((entitySearchResults) => {
                                return {action, catalog, entitySearchResults, currentQuery, tableQueryParams};
                            })
                        );
            }),
            mergeMap(({action, catalog, entitySearchResults, currentQuery, tableQueryParams}) => {
                
                // Track empty search results, using the tracking event triggered from the original action as a base
                const emptyResultSet = entitySearchResults.tableModel.data.length === 0;
                if ( emptyResultSet ) {
                    
                    const selectedEntity = tableQueryParams.tableState.selectedEntity;
                    const index = GAIndex[selectedEntity.toUpperCase()];
                    this.gtmService.trackEvent({
                        category: GACategory.SEARCH,
                        action: GAAction.EXCEPTION,
                        label: "Empty Result Set",
                        dimensions: {
                            [GADimension.CATALOG]: catalog,
                            [GADimension.CURRENT_QUERY]: currentQuery,
                            [GADimension.INDEX]: index
                        }
                    });
                }

                // Set up fetch success action
                const fetchSuccessAction = new FetchFacetsSuccessAction(entitySearchResults.facets);

                // Set up search term action
                const searchTermUpdatedAction =
                    new SearchTermsUpdatedAction(entitySearchResults.searchTerms, entitySearchResults.searchEntities);

                // If we don't need to update the table data (eg if this fetch facets is triggered from a select project
                // action), then just emit actions to update facets and search.
                if ( !(action as FetchFileFacetsRequestAction).updateTableData ) {
                    return of(
                        fetchSuccessAction,
                        searchTermUpdatedAction,
                        new TermCountsUpdatedAction(entitySearchResults.tableModel.termCountsByFacetName)
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
                    tableDataAction = new FetchTableDataRequestAction(entitySearchResults.tableModel.termCountsByFacetName);
                }
                else {
                    const tableModel = entitySearchResults.tableModel;
                    tableDataAction = new FetchTableModelSuccessAction(tableModel);
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
     * Fetch facets from files endpoint to populate facet summary and species form in get data flow.
     */
    @Effect()
    fetchFilesFacets$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFilesFacetsRequestAction.ACTION_TYPE),
            // Prevent dupe hits to fetch files facets. Reset distinct on select of term, or clear of fetch files 
            // facets action.
            distinct((action) => action.type, 
                this.actions$.pipe(ofType(ClearFilesFacetsAction.ACTION_TYPE, SelectFileFacetTermAction.ACTION_TYPE))
            ),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectTableQueryParams), take(1))
                )
            )),
            switchMap(([action, catalog, tableQueryParams]) => {

                const selectedSearchTermsBySearchKey = tableQueryParams.selectedSearchTermsBySearchKey;
                return this.fileService.fetchEntitySearchResults(
                    catalog,
                    selectedSearchTermsBySearchKey,
                    DEFAULT_TABLE_PARAMS,
                    EntityName.FILES);
            }),
            map((entitySearchResults) => {
                
                return new FetchFilesFacetsSuccessAction(entitySearchResults.facets);
            })
        );

    /**
     * Project IDs are included in the set of selected search terms on load of app, query for the corresponding
     * project details.
     */
    @Effect()
    fetchSelectedProjectsById$ = this.actions$.pipe(
        ofType(
            SetViewStateAction.ACTION_TYPE
        ),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectIsSelectedTermsLoading), take(1)),
                this.store.pipe(select(selectSelectedProjectSearchTerms), take(1))
            )
        )),
        filter(([, , loading]) => {
            return loading;
        }),
        switchMap(([action, catalog, loading, selectedProjectSearchTerms]) => {

            return this.fileService.fetchEntitySearchResults(
                catalog,
                new Map([[FileFacetName.PROJECT_ID, new Set(selectedProjectSearchTerms)]]),
                DEFAULT_TABLE_PARAMS,
                EntityName.PROJECTS);
        }),
        map((entitySearchResults) => {
            
            return new FetchSelectedProjectsSuccessAction(entitySearchResults.searchEntities);
        })
    );

    /**
     * Trigger update of file summary if a facet changes (ie term is selected or deselected). File summary includes the
     * donor count, file count etc that is displayed above the facets.
     */
    @Effect()
    fetchSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchFileSummaryRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectSelectedSearchTerms), take(1))
                )
            )),
            switchMap(([action, catalog, searchTerms]) =>
                this.fileService.fetchFileSummary(catalog, searchTerms)),
            map((fileSummary: FileSummary) => new FetchFileSummarySuccessAction(fileSummary))
        );

    /**
     * Returns true if there is currently any projects in the current search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @returns {boolean}
     */
    private isAnyProjectSelected(searchTermsByFacetName: Map<string, Set<SearchTerm>>): boolean {

        return searchTermsByFacetName.has(FileFacetName.PROJECT_ID);
    }
}
