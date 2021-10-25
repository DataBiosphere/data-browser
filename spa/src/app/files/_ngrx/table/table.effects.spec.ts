/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of table effects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Router, RouterEvent } from "@angular/router";
import {  Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of, ReplaySubject } from "rxjs";

// App dependencies
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { CatalogState } from "../catalog/catalog.state";
import { selectCatalog } from "../catalog/catalog.selectors";
import { FetchFileFacetsRequestAction } from "../facet/fetch-file-facets-request.action";
import { FetchSortedTableDataRequestAction } from "./fetch-sorted-table-data-request.action";
import { FetchTableDataRequestAction } from "./fetch-table-data-request.action";
import { FetchTableDataSuccessAction } from "./fetch-table-data-success.action";
import { FilesState } from "../files.state";
import { DEFAULT_FILES_STATE, DEFAULT_PROJECTS_STATE, DEFAULT_SAMPLES_STATE } from "../files.state.mock";
import { FetchFileSummaryRequestAction } from "../file-summary/file-summary.actions";
import { ProjectService } from "../../project/project.service";
import { PROJECT_1M_NEURONS } from "../search/search.state.mock";
import { SelectProjectIdAction } from "../search/select-project-id.action";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { GAIndex } from "../../../shared/analytics/ga-index.model";
import { DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS } from "../../shared/entity-search-results.mock";
import { FILE_SUMMARY } from "../../shared/file-summary.mock";
import { FilesService } from "../../shared/files.service";
import { ProjectMockService } from "../../shared/project.service.mock";
import { TableEffects } from "./table.effects";
import { TableNextPageAction } from "./table-next-page.action";
import { TableNextPageSuccessAction } from "./table-next-page-success.action";
import { TablePreviousPageAction } from "./table-previous-page.action";
import { TablePreviousPageSuccessAction } from "./table-previous-page-success.action";
import { UrlService } from "../../url/url.service";

describe("Table Effects", () => {

    let actions$: Observable<any>;
    let effects: TableEffects;
    let gtmService: GTMService;
    let store: MockStore<FilesState>;
    let urlService; // No type to enable jasmine mocking (eg .and.returnValue)

    const navigation$ = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        events: navigation$.asObservable(),
        isActive: jasmine.createSpy("isActive"),
        navigate: jasmine.createSpy("navigate"),
        url: "projects"
    };

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        const filesService = jasmine.createSpyObj("FilesService", ["fetchEntitySearchResults", "fetchFileSummary"]);
        filesService.fetchEntitySearchResults.and.returnValue(of(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS));
        filesService.fetchFileSummary.and.returnValue(of(FILE_SUMMARY));

        TestBed.configureTestingModule({
            imports: [
                // any modules needed
            ],
            providers: [
                TableEffects,
                {
                    provide: FilesService, useValue: filesService
                },
                GTMService,
                {
                    provide: ProjectService, useClass: ProjectMockService
                },
                {
                    provide: UrlService,
                    useValue: jasmine.createSpyObj("UrlService", [
                        "isViewingEntities",
                        "isViewingFiles",
                        "isViewingProjects",
                        "isViewingSamples"
                    ])
                }, 
                provideMockActions(() => actions$), {
                    provide: Router,
                    useValue: routerMock
                },
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE}),
                {
                    provide: "Window",
                    useFactory: (() => {
                        return window;
                    })
                }
            ],
        });

        effects = TestBed.inject(TableEffects);
        gtmService = TestBed.inject(GTMService);
        
        urlService = TestBed.inject(UrlService);
        store = TestBed.inject(Store) as MockStore<FilesState>;
    });

    describe("selectProject$", () => {

        /**
         * Table data should not be updated when selecting a project from the projects tab.
         */
        it(`projects tab - should set "update table data" flag to false`, () => {

            actions$ = hot("--a-", {
                a: new SelectProjectIdAction(PROJECT_1M_NEURONS.id, PROJECT_1M_NEURONS.name, true, GASource.SEARCH)
            });

            const expected = cold("--(bc)", {
                b: new FetchFileSummaryRequestAction(),
                c: new FetchFileFacetsRequestAction(false)
            });

            expect(effects.selectProject$).toBeObservable(expected);
        });

        /**
         * Table data should be updated when selecting a project from the samples tab.
         */
        it(`samples tab - should set "update table data" flag to true`, () => {

            // Update selected tab to be samples
            store.setState(DEFAULT_SAMPLES_STATE);

            actions$ = hot("--a-", {
                a: new SelectProjectIdAction(PROJECT_1M_NEURONS.id, PROJECT_1M_NEURONS.name, true, GASource.SEARCH)
            });

            const expected = cold("--(bc)", {
                b: new FetchFileSummaryRequestAction(),
                c: new FetchFileFacetsRequestAction(true)
            });

            expect(effects.selectProject$).toBeObservable(expected);
        });

        /**
         * Table data should be updated when selecting a project from the files tab.
         */
        it(`files tab - should set "update table data" flag to true`, () => {

            // Update selected tab to be samples
            store.setState(DEFAULT_FILES_STATE);

            actions$ = hot("--a-", {
                a: new SelectProjectIdAction(PROJECT_1M_NEURONS.id, PROJECT_1M_NEURONS.name, true, GASource.SEARCH)
            });

            const expected = cold("--(bc)", {
                b: new FetchFileSummaryRequestAction(),
                c: new FetchFileFacetsRequestAction(true)
            });

            expect(effects.selectProject$).toBeObservable(expected);
        });


        /**
         * Tracks next page events, sends catalog dimension.
         */
        it("tracks select project with catalog dimension", () => {

            const catalog = "foo";
            store.overrideSelector(selectCatalog, catalog);

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = 
                new SelectProjectIdAction(PROJECT_1M_NEURONS.id, PROJECT_1M_NEURONS.name, true, GASource.SEARCH)
            actions$ = of(action);
            
            effects.selectProject$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                dimensions: jasmine.objectContaining({
                    catalog
                })
            }));
        });
    });

    describe("fetchTableData$", () => {

        /**
         * Only table data should be updated when viewing a project tab and there is a selected project search term.
         */
        it("should update table data only", () => {

            // Update selected tab to be files
            store.setState(DEFAULT_FILES_STATE);

            actions$ = hot("--a-", {
                a: new FetchTableDataRequestAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
            });

            const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
            const expected = cold("--b", {
                b: new FetchTableDataSuccessAction(tableModel.data, tableModel.pagination, tableModel.termCountsByFacetName)
            });

            expect(effects.fetchTableData$).toBeObservable(expected);
        });

        /**
         * Confirm catalog is specified in fetch request.
         */
        it("adds catalog to fetch request", () => {

            // Spy on effects to confirm catalog is specified correctly
            spyOn<any>(effects, "fetchEntitySearchResults").and.callThrough();

            // Update selected tab to be files
            const selectedCatalog = DCPCatalog.DCP1;
            store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
                catalog: new CatalogState({
                    catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                    defaultCatalog: DCPCatalog.DCP2
                }, selectedCatalog, true)
            }));

            const action = new FetchTableDataRequestAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName);
            actions$ = of(action);
            
            // Execute effect
            effects.fetchTableData$.subscribe();

            expect(effects["fetchEntitySearchResults"]).toHaveBeenCalledWith(
                selectedCatalog,
                jasmine.any(Object),
                jasmine.any(Object)
            );
        });
    });

    describe("fetchNextPagedTableData$", () => {

        /**
         * Only table data should be updated when navigating to next page of data.
         */
        it("should update table data only", () => {

            // Update selected tab to be files
            store.setState(DEFAULT_FILES_STATE);

            actions$ = hot("--a-", {
                a: new TableNextPageAction({
                    "search_after": "10x 1 Run Integration Test",
                    "search_after_uid": "doc#1af6d535-81f1-4a3f-8626-830ae8668867",
                    "size": 15,
                    "sort": "projectTitle",
                    "order": "asc"
                }, 1)
            });

            const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
            const expected = cold("--b", {
                b: new TableNextPageSuccessAction(tableModel)
            });

            expect(effects.fetchNextPagedTableData$).toBeObservable(expected);
        });

        /**
         * Confirm catalog is specified in fetch request.
         */
        it("adds catalog to fetch request", () => {

            // Spy on effects to confirm catalog is specified correctly
            spyOn<any>(effects, "fetchEntitySearchResults").and.callThrough();

            // Update selected tab to be files
            const selectedCatalog = DCPCatalog.DCP2;
            store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
                catalog: new CatalogState({
                    catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                    defaultCatalog: DCPCatalog.DCP1
                }, selectedCatalog, true)
            }));

            const action = new TableNextPageAction({
                "search_after": "10x 1 Run Integration Test",
                "search_after_uid": "doc#1af6d535-81f1-4a3f-8626-830ae8668867",
                "size": 15,
                "sort": "projectTitle",
                "order": "asc"
            }, 1);
            actions$ = of(action);

            // Execute effect
            effects.fetchNextPagedTableData$.subscribe();

            expect(effects["fetchEntitySearchResults"]).toHaveBeenCalledWith(
                selectedCatalog,
                jasmine.any(Object),
                jasmine.any(Object)
            );
        });

        /**
         * Tracks next page events, sends catalog dimension.
         */
        it("tracks next page with catalog dimension", () => {

            const catalog = "foo";
            store.overrideSelector(selectCatalog, catalog);

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new TableNextPageAction({
                "search_after": "10x 1 Run Integration Test",
                "search_after_uid": "doc#1af6d535-81f1-4a3f-8626-830ae8668867",
                "size": 15,
                "sort": "projectTitle",
                "order": "asc"
            }, 1);
            actions$ = of(action);

            effects.fetchNextPagedTableData$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                dimensions: jasmine.objectContaining({
                    catalog
                })
            }));
        });
    });

    describe("fetchPreviousPagedTableData$", () => {

        /**
         * Only table data should be updated when navigating to previous page of data.
         */
        it("should update table data only", () => {

            // Update selected tab to be files
            store.setState(DEFAULT_FILES_STATE);

            actions$ = hot("--a-", {
                a: new TablePreviousPageAction({
                    "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                    "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                    "size": 15,
                    "sort": "projectTitle",
                    "order": "asc"
                }, 2)
            });

            const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
            const expected = cold("--b", {
                b: new TablePreviousPageSuccessAction(tableModel)
            });

            expect(effects.fetchPreviousPagedTableData$).toBeObservable(expected);
        });

        /**
         * Confirm catalog is specified in fetch request.
         */
        it("adds catalog to fetch request", () => {

            // Spy on effects to confirm catalog is specified correctly
            spyOn<any>(effects, "fetchEntitySearchResults").and.callThrough();

            // Update selected tab to be files
            const selectedCatalog = DCPCatalog.DCP1;
            store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
                catalog: new CatalogState({
                    catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                    defaultCatalog: DCPCatalog.DCP2
                }, selectedCatalog, true)
            }));

            const action = new TablePreviousPageAction({
                "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                "size": 15,
                "sort": "projectTitle",
                "order": "asc"
            }, 2);
            actions$ = of(action);

            // Execute effect
            effects.fetchPreviousPagedTableData$.subscribe();

            expect(effects["fetchEntitySearchResults"]).toHaveBeenCalledWith(
                selectedCatalog,
                jasmine.any(Object),
                jasmine.any(Object)
            );
        });

        /**
         * Tracks previous page events, sends catalog dimension.
         */
        it("tracks previous page with catalog dimension", () => {

            const catalog = "foo";
            store.overrideSelector(selectCatalog, catalog);

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new TablePreviousPageAction({
                "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                "size": 15,
                "sort": "projectTitle",
                "order": "asc"
            }, 2);
            actions$ = of(action);
            
            effects.fetchPreviousPagedTableData$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                dimensions: jasmine.objectContaining({
                    catalog
                })
            }));
        });
    });

    describe("fetchSortedTableData$", () => {

        /**
         * Only table data should be updated when sorting or updating the page size of the table.
         */
        it("should update table data only", () => {

            // Update selected tab to be files
            store.setState(DEFAULT_FILES_STATE);

            actions$ = hot("--a-", {
                a: new FetchSortedTableDataRequestAction(
                    {
                        "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                        "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                        "size": 15,
                        "sort": "projectTitle",
                        "order": "desc"
                    },
                    GAIndex.PROJECTS,
                    GASource.SEARCH_RESULTS)
            });

            const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
            const expected = cold("--b", {
                b: new FetchTableDataSuccessAction(tableModel.data, tableModel.pagination, DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
            });

            expect(effects.fetchSortedTableData$).toBeObservable(expected);
        });


        /**
         * Confirm catalog is specified in fetch request.
         */
        it("adds catalog to fetch request", () => {

            // Spy on effects to confirm catalog is specified correctly
            spyOn<any>(effects, "fetchEntitySearchResults").and.callThrough();

            // Update selected tab to be files
            const selectedCatalog = DCPCatalog.DCP1;
            store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
                catalog: new CatalogState({
                    catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                    defaultCatalog: DCPCatalog.DCP2
                }, selectedCatalog, true)
            }));

            const action = new FetchSortedTableDataRequestAction(
                {
                    "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                    "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                    "size": 15,
                    "sort": "projectTitle",
                    "order": "desc"
                },
                GAIndex.PROJECTS,
                GASource.SEARCH_RESULTS);
            actions$ = of(action);

            // Execute effect
            effects.fetchSortedTableData$.subscribe();

            expect(effects["fetchEntitySearchResults"]).toHaveBeenCalledWith(
                selectedCatalog,
                jasmine.any(Object),
                jasmine.any(Object)
            );
        });

        /**
         * Tracks sorted events, sends catalog dimension.
         */
        it("tracks sorted with catalog dimension", () => {

            const catalog = "foo";
            store.overrideSelector(selectCatalog, catalog);

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new FetchSortedTableDataRequestAction(
                {
                    "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                    "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                    "size": 15,
                    "sort": "projectTitle",
                    "order": "desc"
                },
                GAIndex.PROJECTS,
                GASource.SEARCH_RESULTS);
            actions$ = of(action);
            
            effects.fetchSortedTableData$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                dimensions: jasmine.objectContaining({
                    catalog
                })
            }));
        });
    });
});
