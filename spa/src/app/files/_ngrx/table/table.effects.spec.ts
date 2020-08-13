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
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from "@angular/router";
import {  Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of, ReplaySubject } from "rxjs";

// App dependencies
import { Catalog } from "../../catalog/catalog.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { FetchFileFacetsRequestAction } from "../facet/fetch-file-facets-request.action";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { FetchSortedTableDataRequestAction } from "./fetch-sorted-table-data-request.action";
import { FetchTableDataRequestAction } from "./fetch-table-data-request.action";
import { FetchTableDataSuccessAction } from "./fetch-table-data-success.action";
import { FileState } from "../file.state";
import { DEFAULT_FILES_STATE, DEFAULT_PROJECTS_STATE, DEFAULT_SAMPLES_STATE } from "../file.state.mock";
import { FetchFileSummaryRequestAction } from "../file-summary/file-summary.actions";
import { ProjectService } from "../../project/project.service";
import { PROJECT_1M_NEURONS } from "../search/search.state.mock";
import { SelectProjectIdAction } from "../search/select-project-id.action";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { QueryStringSearchTerm } from "../../search/url/query-string-search-term.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { GAIndex } from "../../../shared/analytics/ga-index.model";
import { DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS } from "../../shared/entity-search-results.mock";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { FilesService } from "../../shared/files.service";
import { EntityName } from "../../shared/entity-name.model";
import { GenusSpecies } from "../../shared/genus-species.model";
import { ProjectMockService } from "../../shared/project.service.mock";
import { TableEffects } from "./table.effects";
import { TableNextPageAction } from "./table-next-page.action";
import { TableNextPageSuccessAction } from "./table-next-page-success.action";
import { TablePreviousPageAction } from "./table-previous-page.action";
import { TablePreviousPageSuccessAction } from "./table-previous-page-success.action";
import { ActivatedRouteStub } from "../../../test/activated-route.stub";
import { UrlService } from "../../url/url.service";

describe("Table Effects", () => {

    let actions$: Observable<any>;
    let activatedRoute;  // No type to enable jasmine mocking (eg .and.returnValue)
    let effects: TableEffects;
    let searchTermUrlService; // No type to enable jasmine mocking (eg .and.returnValue)
    let store: MockStore<FileState>;
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
        filesService.fetchFileSummary.and.returnValue(of(DEFAULT_FILE_SUMMARY));

        TestBed.configureTestingModule({
            imports: [
                // any modules needed
            ],
            providers: [
                TableEffects,
                {
                    provide: FilesService, useValue: filesService
                }, {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                }, {
                    provide: ProjectService, useClass: ProjectMockService
                }, {
                    provide: SearchTermUrlService,
                    useValue: jasmine.createSpyObj("SearchTermUrlService", [
                        "getDefaultSearchState",
                        "parseQueryStringSearchTerms",
                        "stringifySearchTerms"
                    ])
                }, {
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
                }, {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteStub
                },
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE})
            ],
        });

        activatedRoute = TestBed.inject(ActivatedRoute);
        effects = TestBed.inject(TableEffects);
        
        searchTermUrlService = TestBed.inject(SearchTermUrlService);
        searchTermUrlService.getDefaultSearchState.and.returnValue(
            new QueryStringSearchTerm(FileFacetName.GENUS_SPECIES, [GenusSpecies.HOMO_SAPIENS]));
        
        urlService = TestBed.inject(UrlService);
        store = TestBed.inject(Store) as MockStore<FileState>; /* TODO revisit "as xxx" after upgrade to 10 */
    });

    /**
     * Table data should not be updated when selecting a project from the projects tab.
     */
    it(`selectProject$ - projects tab - should set "update table data" flag to false`, () => {

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
    it(`selectProject$ - samples tab - should set "update table data" flag to true`, () => {

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
    it(`selectProject$ - files tab - should set "update table data" flag to true`, () => {

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
     * Only table data should be updated when viewing a project tab and there is a selected project search term.
     */
    it("fetchTableData$ - should update table data only", () => {

        // Update selected tab to be samples
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
     * Only table data should be updated when navigating to next page of data.
     */
    it("fetchNextPagedOrSortedTableData$ - should update table data only", () => {

        // Update selected tab to be samples
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

        expect(effects.fetchNextPagedOrSortedTableData$).toBeObservable(expected);
    });

    /**
     * Only table data should be updated when navigating to previous page of data.
     */
    it("fetchPreviousPagedOrSortedTableData$ - should update table data only", () => {

        // Update selected tab to be samples
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

        expect(effects.fetchPreviousPagedOrSortedTableData$).toBeObservable(expected);
    });

    /**
     * Only table data should be updated when sorting or updating the page size of the table.
     */
    it("fetchPagedOrSortedTableData$ - should update table data only", () => {

        // Update selected tab to be samples
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
     * Projects is set as selected entity.
     */
    it("initTableState$ - correctly sets projects as selected entity", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(true)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);
        
        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(true);
        
        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /, which redirects to /projects
        navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

        // Confirm projects is the selected entity
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedEntity).toEqual(EntityName.PROJECTS);
            done();
        });
    });

    /**
     * Samples is set as selected entity.
     */
    it("initTableState$ - correctly sets samples as selected entity", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(true);

        // Return empty array, representing no filter currently selected 
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

        // Return false for currently viewing projects
        urlService.isViewingProjects.and.returnValue(false);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /samples
        navigation$.next(new NavigationEnd(1, `/${EntityName.SAMPLES}`, `/${EntityName.SAMPLES}`));

        // Confirm samples is the selected entity
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedEntity).toEqual(EntityName.SAMPLES);
            done();
        });
    });

    /**
     * Files is set as selected entity.
     */
    it("initTableState$ - correctly sets files as selected entity", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
            .withArgs(EntityName.FILES, false).and.returnValue(true)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

        // Return false for currently viewing projects
        urlService.isViewingProjects.and.returnValue(false);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /files
        navigation$.next(new NavigationEnd(1, `/${EntityName.FILES}`, `/${EntityName.FILES}`));

        // Confirm projects is the selected entity
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedEntity).toEqual(EntityName.FILES);
            done();
        });
    });

    /**
     * Default search state (genus species / homo sapiens) set if on projects tab.
     */
    it("initTableState$ - set default search state if filter not specified on projects", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(true)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(true);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /files
        navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

        // Confirm default state is added to action
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual([
                searchTermUrlService.getDefaultSearchState()
            ]);
            done();
        });
    });

    /**
     * Default search state (genus species / homo sapiens) not set if on files tab.
     */
    it("initTableState$ - default search state not set if filter not specified on files", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
            .withArgs(EntityName.FILES, false).and.returnValue(true)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(false);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /files
        navigation$.next(new NavigationEnd(1, `/${EntityName.FILES}`, `/${EntityName.FILES}`));

        // Confirm default state is not added to action
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual([]);
            done();
        });
    });

    /**
     * Default search state (genus species / homo sapiens) not set if on samples tab.
     */
    it("initTableState$ - default search state not set if filter not specified on samples", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(true);

        // Return empty array, representing no filter currently selected 
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(false);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /samples
        navigation$.next(new NavigationEnd(1, `/${EntityName.SAMPLES}`, `/${EntityName.SAMPLES}`));

        // Confirm default state is not added to action
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual([]);
            done();
        });
    });

    /**
     * Search state (genus species / homo sapiens) set from filter.
     */
    it("initTableState$ - set search state from filter", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(true)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        const queryStringSearchTerms = [
            new QueryStringSearchTerm(FileFacetName.GENUS_SPECIES, [GenusSpecies.MUS_MUSCULUS])
        ];
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue(queryStringSearchTerms);

        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(true);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /files
        navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

        // Confirm projects is the selected entity
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual(queryStringSearchTerms);
            done();
        });
    });

    /**
     * Search state (project / uuid) set from filter.
     */
    it("initTableState$ - set project ID search state from filter", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(true)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        const queryStringSearchTerms = [
            new QueryStringSearchTerm(FileFacetName.PROJECT, ["123abc"])
        ];
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue(queryStringSearchTerms);

        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(true);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });

        // Navigate to /files
        navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

        // Confirm project ID is added to action
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual(queryStringSearchTerms);
            done();
        });
    });

    /**
     * Catalog is set correctly from query string param.
     */
    it("initTableState$ - init catalog when specified in query string", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(true)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        const queryStringSearchTerms = [
            new QueryStringSearchTerm(FileFacetName.PROJECT, ["123abc"])
        ];
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue(queryStringSearchTerms);

        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(true);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        const catalog = Catalog.DCP1;
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {
                catalog
            }
        });

        // Navigate to /files
        navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

        // Confirm project ID is added to action
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).catalog).toEqual(catalog);
            done();
        });
    });

    /**
     * Catalog not set if not specified from query string param.
     */
    it("initTableState$ - catalog set to NONE when not specified in query string", (done: DoneFn) => {

        // Return true if isActive is called with "samples"
        routerMock.isActive
            .withArgs(EntityName.PROJECTS, false).and.returnValue(true)
            .withArgs(EntityName.FILES, false).and.returnValue(false)
            .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

        // Return empty array, representing no filter currently selected 
        const queryStringSearchTerms = [
            new QueryStringSearchTerm(FileFacetName.PROJECT, ["123abc"])
        ];
        searchTermUrlService.parseQueryStringSearchTerms.and.returnValue(queryStringSearchTerms);

        // Return true for currently viewing projects
        urlService.isViewingProjects.and.returnValue(true);

        // Return empty query string params (this mocking is required for pulling catalog value from params)
        const catalog = Catalog.NONE;
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {
                catalog
            }
        });

        // Navigate to /files
        navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

        // Confirm project ID is added to action
        effects.initTableState$.subscribe((dispatchedAction) => {
            expect((dispatchedAction as SetViewStateAction).catalog).toEqual(catalog);
            done();
        });
    });
});
