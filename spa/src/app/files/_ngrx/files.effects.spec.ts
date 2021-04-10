/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of file effects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

// App dependencies
import { selectCatalog } from "./catalog/catalog.selectors";
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { ConfigService } from "../../config/config.service";
import { EntityRequestService } from "../entity/entity-request.service";
import { FetchFacetsSuccessAction } from "./facet/fetch-facets-success-action.action";
import { FetchFileFacetsRequestAction } from "./facet/fetch-file-facets-request.action";
import { FilesEffects } from "./files.effects";
import { selectTableQueryParams } from "./files.selectors";
import { FilesState } from "./files.state";
import {
    DEFAULT_FILES_STATE,
    DEFAULT_PROJECTS_STATE,
    DEFAULT_SAMPLES_STATE, FILES_STATE_WITH_SEARCH_TERM,
    PROJECTS_STATE_WITH_PROJECT_SEARCH_TERM, SAMPLES_STATE_WITH_SEARCH_TERM
} from "./files.state.mock";
import { HttpService } from "../http/http.service";
import { ResponseTermService } from "../http/response-term.service";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { selectPreviousQuery } from "./search/search.selectors";
import { SearchTermsUpdatedAction } from "./search/search-terms-updated.action";
import { GTMService } from "../../shared/analytics/gtm.service";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { GACategory } from "../../shared/analytics/ga-category.model";
import { GADimension } from "../../shared/analytics/ga-dimension.model";
import { DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS } from "../shared/entity-search-results.mock";
import { FilesService } from "../shared/files.service";
import { DEFAULT_FILE_SUMMARY } from "../shared/file-summary.mock";
import { TermCountsUpdatedAction } from "./table/term-counts-updated.action";
import { FetchTableModelSuccessAction } from "./table/fetch-table-model-success.action";
import { FetchTableDataRequestAction } from "./table/fetch-table-data-request.action";
import { Pagination } from "../table/pagination/pagination.model";
import { PaginationService } from "../table/pagination/pagination.service";

describe("FilesEffects", () => {

    let effects: FilesEffects;
    let filesService: FilesService;
    let gtmService: GTMService;
    let actions$: Observable<any>;
    let store: MockStore<FilesState>;
    
    // Spies
    let fetchEntitySearchResults;

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                provideMockActions(() => actions$),
                ConfigService,
                EntityRequestService,
                FilesEffects,
                FilesService,
                GTMService,
                HttpService,
                PaginationService,
                ResponseTermService,
                SearchTermHttpService,
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE}),
                {
                    provide: "Window",
                    useFactory: (() => {
                        return window;
                    })
                }
            ]
        });

        effects = TestBed.inject(FilesEffects);
        
        filesService = TestBed.inject(FilesService);
        fetchEntitySearchResults = spyOn(filesService, "fetchEntitySearchResults");
        fetchEntitySearchResults.and.returnValue(of(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS));
        spyOn(filesService, "fetchFileSummary").and.returnValue(of(DEFAULT_FILE_SUMMARY));
        
        gtmService = TestBed.inject(GTMService);
        store = TestBed.inject(Store) as MockStore<FilesState>;
    });

    describe("fetchFacets$", () => {

        describe("Projects", () => {

            /**
             * Term counts that are displayed on the table column headers should be updated when fetching facets if the "update
             * table data" flag is set to false.
             */
            it(`updates column term counts when "update table data" is set to false`, () => {

                // The select project action is translated into a fetch file facets action, with the update project table flag
                // set to false
                actions$ = hot("--a-", {
                    a: new FetchFileFacetsRequestAction(false)
                });

                const expected = cold("--(bcd)", {
                    b: new FetchFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.facets),
                    c: new SearchTermsUpdatedAction([], []),
                    d: new TermCountsUpdatedAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
                });

                expect(effects.fetchFacets$).toBeObservable(expected);
            });

            /**
             * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
             * data" flag is set to true and the current tab is projects.
             */
            it("updates full table model when no project search term is selected", () => {

                // The select project action is translated into a fetch file facets action, with the update project table flag
                // set to false
                actions$ = hot("--a-", {
                    a: new FetchFileFacetsRequestAction(true)
                });

                const expected = cold("--(bcd)", {
                    b: new FetchFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.facets),
                    c: new SearchTermsUpdatedAction([], []),
                    d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
                });

                expect(effects.fetchFacets$).toBeObservable(expected);
            });

            /**
             * A new request to fetch table data should be returned when viewing the projects tab and there is currently a
             * selected project.
             */
            it("requests table data when a project search term is selected", () => {

                // Update search state to include a selected project search term
                store.setState(PROJECTS_STATE_WITH_PROJECT_SEARCH_TERM);

                // Dispatch the fetch file facets action
                actions$ = hot("--a-", {
                    a: new FetchFileFacetsRequestAction(true)
                });

                const expected = cold("--(bcd)", {
                    b: new FetchFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.facets),
                    c: new SearchTermsUpdatedAction([], []),
                    d: new FetchTableDataRequestAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
                });

                expect(effects.fetchFacets$).toBeObservable(expected);
            });
        });

        describe("Samples", () => {

            /**
             * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
             * data" flag is set to true and the current tab is samples.
             */
            it("updates full table model when no project search term is selected", () => {

                // Update selected tab to be samples
                store.setState(DEFAULT_SAMPLES_STATE);

                // Dispatch the fetch file facets action
                actions$ = hot("--a-", {
                    a: new FetchFileFacetsRequestAction(true)
                });

                const expected = cold("--(bcd)", {
                    b: new FetchFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.facets),
                    c: new SearchTermsUpdatedAction([], []),
                    d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
                });

                expect(effects.fetchFacets$).toBeObservable(expected);
            });

            /**
             * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
             * data" flag is set to true and the current tab is samples.
             */
            it("updates full table model when a project search term is selected", () => {

                // Update search state to include a selected project search term
                store.setState(SAMPLES_STATE_WITH_SEARCH_TERM);

                // Dispatch the fetch file facets action
                actions$ = hot("--a-", {
                    a: new FetchFileFacetsRequestAction(true)
                });

                const expected = cold("--(bcd)", {
                    b: new FetchFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.facets),
                    c: new SearchTermsUpdatedAction([], []),
                    d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
                });

                expect(effects.fetchFacets$).toBeObservable(expected);
            });
        });

        describe("Files", () => {

            /**
             * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
             * data" flag is set to true and the current tab is files.
             */
            it("updates full table model when no project search term is selected", () => {

                // Update selected tab to be files
                store.setState(DEFAULT_FILES_STATE);

                // Dispatch the fetch file facets action
                actions$ = hot("--a-", {
                    a: new FetchFileFacetsRequestAction(true)
                });

                const expected = cold("--(bcd)", {
                    b: new FetchFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.facets),
                    c: new SearchTermsUpdatedAction([], []),
                    d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
                });

                expect(effects.fetchFacets$).toBeObservable(expected);
            });

            /**
             * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
             * data" flag is set to true and the current tab is files.
             */
            it("updates full table model when a project search term is selected", () => {

                // Update search state to include a selected project search term
                store.setState(FILES_STATE_WITH_SEARCH_TERM);

                // Dispatch the fetch file facets action
                actions$ = hot("--a-", {
                    a: new FetchFileFacetsRequestAction(true)
                });

                const expected = cold("--(bcd)", {
                    b: new FetchFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.facets),
                    c: new SearchTermsUpdatedAction([], []),
                    d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
                });

                expect(effects.fetchFacets$).toBeObservable(expected);
            });
        });

        describe("Search Exceptions", () => {

            const mockSelectCatalog = DCPCatalog.DCP3;
            const mockTableQueryParams = {
                selectedSearchTermsBySearchKey: new Map(),
                pagination: {} as any,
                tableState: {
                    entitySpecs: [],
                    selectedEntity: "foo",
                    selectedProject: null,
                    tableModels: [{
                        pagination: {} as any,
                        data: [],
                        loading: false,
                        tableName: "foo",
                        termCountsByFacetName: new Map()
                    }]
                }
            };
            const mockSelectPreviousQuery = "";

            beforeEach(async() => {

                store.overrideSelector(selectCatalog, mockSelectCatalog);
                store.overrideSelector(selectTableQueryParams, mockTableQueryParams);
                store.overrideSelector(selectPreviousQuery, mockSelectPreviousQuery);

                fetchEntitySearchResults.and.returnValue(of({
                    facets: [],
                    searchEntities: [],
                    searchTerms: [],
                    tableModel: {
                        pagination: {} as Pagination,
                        data: [],
                        loading: false,
                        tableName: "foo",
                        termCountsByFacetName: new Map()
                    }
                }));
            });

            /**
             * Confirm tracking is called.
             */
            it("tracks search exceptions", () => {

                spyOn(gtmService, "trackEvent").and.callThrough();

                const action = new FetchFileFacetsRequestAction(true);
                actions$ = of(action);
                effects.fetchFacets$.subscribe();
                expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                    category: GACategory.SEARCH,
                    action: GAAction.EXCEPTION,
                    label: "Empty Result Set"
                }));
            });

            /**
             * Confirm tracking is called with catalog dimension.
             */
            it("tracks search exceptions with catalog dimension", () => {

                spyOn(gtmService, "trackEvent").and.callThrough();

                const action = new FetchFileFacetsRequestAction(true);
                actions$ = of(action);
                effects.fetchFacets$.subscribe();
                expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                    dimensions: jasmine.objectContaining({
                        [GADimension.CATALOG]: mockSelectCatalog
                    })
                }));
            });
        });
    });
});
