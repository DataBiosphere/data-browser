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
import { map, mergeMap, switchMap, take } from "rxjs/operators";

// App dependencies
import { TrackingAction } from "./analytics/tracking.action";
import { FetchFacetsSuccessAction } from "./facet/fetch-facets-success-action.action";
import { FetchIsMatrixSupportedRequestAction } from "./facet/fetch-is-matrix-supported-request.action";
import { FetchIsMatrixSupportedSuccessAction } from "./facet/fetch-is-matrix-supported-success.action";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "./facet/set-view-state.action";
import { FetchFileFacetsRequestAction, InitEntityStateAction, NoOpAction } from "./facet/file-facet-list.actions";
import { selectTableQueryParams } from "./file.selectors";
import { FileSummary } from "../file-summary/file-summary";
import { FetchFileSummaryRequestAction, FetchFileSummarySuccessAction } from "./file-summary/file-summary.actions";
import { AppState } from "../../_ngrx/app.state";
import { ClearSelectedTermsAction } from "./search/clear-selected-terms.action";
import { SelectFileFacetTermAction } from "./search/select-file-facet-term.action";
import { selectSelectedSearchTerms } from "./search/search.selectors";
import { SearchTermsUpdatedAction } from "./search/search-terms-updated.action";
import { SearchTerm } from "../search/search-term.model";
import { SelectFacetAgeRangeAction } from "./search/select-facet-age-range.action";
import { ClearSelectedAgeRangeAction } from "./search/clear-selected-age-range.action";
import { GTMService } from "../../shared/analytics/gtm.service";
import { EntityName } from "../shared/entity-name.model";
import { FilesService } from "../shared/files.service";
import { FetchTableDataRequestAction } from "./table/fetch-table-data-request.action";
import { FetchTableModelSuccessAction } from "./table/fetch-table-model-success.action";
import { DEFAULT_TABLE_PARAMS } from "../table/pagination/table-params.model";
import { TermCountsUpdatedAction } from "./table/term-counts-updated.action";

@Injectable()
export class FileEffects {

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
                ClearSelectedTermsAction.ACTION_TYPE, // Clear all selected terms
                ClearSelectedAgeRangeAction.ACTION_TYPE, // Clear age range
                InitEntityStateAction.ACTION_TYPE, // Init table data for newly selected tab, if table data isn't cached
                SetViewStateAction.ACTION_TYPE, // Setting up app state from URL params
                SelectFileFacetTermAction.ACTION_TYPE, // Selecting facet term eg file type "matrix"
                SelectFacetAgeRangeAction.ACTION_TYPE // Setting age range
            ),
            mergeMap((action) => {

                // If this action is a tracking action, send tracking event.
                if ( (action as TrackingAction).asEvent ) {
                    this.gtmService.trackEvent((action as TrackingAction).asEvent());
                }

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
     * tab with a selected project, an additional call to populate the table is called.
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
                    {},
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
            mergeMap(({action, tableQueryParams, entitySearchResults}) => {

                // Set up fetch success action
                const fetchSuccessAction = new FetchFacetsSuccessAction(entitySearchResults.facets);

                // Set up search term action
                const searchTermUpdatedAction = new SearchTermsUpdatedAction(entitySearchResults.searchTerms);

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
     * Determine if the current set of data is matrixable.
     */
    @Effect()
    fetchIsMatrixSupported: Observable<Action> = this.actions$
        .pipe(
            ofType(
                FetchIsMatrixSupportedRequestAction.ACTION_TYPE
            ),
            switchMap(() =>
                this.store.pipe(
                    select(selectTableQueryParams),
                    take(1)
                )
            ),
            switchMap((tableQueryParams) => {

                return this.fileService.fetchIsMatrixSupported(
                    tableQueryParams.selectedSearchTermsBySearchKey, DEFAULT_TABLE_PARAMS);
            }),
            map((matrixableSearchResults: boolean) => new FetchIsMatrixSupportedSuccessAction(matrixableSearchResults))
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
     * Returns true if there is currently any projects in the current search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @returns {boolean}
     */
    private isAnyProjectSelected(searchTermsByFacetName: Map<string, Set<SearchTerm>>): boolean {

        return searchTermsByFacetName.has(FileFacetName.PROJECT) || searchTermsByFacetName.has(FileFacetName.PROJECT_ID);
    }
}
