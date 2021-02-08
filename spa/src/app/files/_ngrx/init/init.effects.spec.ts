/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of table effects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from "@angular/router";
import {  Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of, ReplaySubject } from "rxjs";

// App dependencies
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { DefaultFilterInitAction } from "./default-filter-init.action";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { FileState } from "../file.state";
import { DEFAULT_PROJECTS_STATE } from "../file.state.mock";
import { InitEffects } from "./init.effects";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { QueryStringSearchTerm } from "../../search/url/query-string-search-term.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { EntityName } from "../../shared/entity-name.model";
import { GenusSpecies } from "../../shared/genus-species.model";
import { ActivatedRouteStub } from "../../../test/activated-route.stub";

describe("Init Effects", () => {

    let actions$: Observable<any>;
    let activatedRoute;  // No type to enable jasmine mocking (eg .and.returnValue)
    let effects: InitEffects;
    let gtmService; // No type to enable jasmine mocking (eg .and.returnValue)
    let searchTermUrlService; // No type to enable jasmine mocking (eg .and.returnValue)
    let store: MockStore<FileState>;

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

        TestBed.configureTestingModule({
            imports: [
                // any modules needed
            ],
            providers: [
                InitEffects,
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                },
                {
                    provide: SearchTermUrlService,
                    useValue: jasmine.createSpyObj("SearchTermUrlService", [
                        "getDefaultSearchState",
                        "parseQueryStringSearchTerms",
                        "stringifySearchTerms"
                    ])
                },
                provideMockActions(() => actions$), {
                    provide: Router,
                    useValue: routerMock
                },
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteStub
                },
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE})
            ],
        });

        activatedRoute = TestBed.inject(ActivatedRoute);
        effects = TestBed.inject(InitEffects);
        
        gtmService = TestBed.inject(GTMService);

        searchTermUrlService = TestBed.inject(SearchTermUrlService);
        
        store = TestBed.inject(Store) as MockStore<FileState>; /* TODO revisit "as xxx" after upgrade to 10 */
    });

    describe("updateDefaultFilterInit$", () => {

        /**
         * Default filter init flag is set to true after initial navigation event
         */
        it("initializes default filter init flag after initial navigation event", (done: DoneFn) => {

            navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));
            
            // Confirm default filter init action is dispatched
            effects.updateDefaultFilterInit$.subscribe((dispatchedAction) => {
                expect(dispatchedAction.type).toEqual(DefaultFilterInitAction.ACTION_TYPE);
                done();
            });
        });
    });

    describe("initPageview$", () => {

        /**
         * No pageview for /
         */
        it(`ignores pageview for "/"`, () => {

            navigation$.next(new NavigationEnd(1, "/", "/"));

            // Subscribe to non-dispatching event and then confirm side-effect 
            effects.initPageview$.subscribe();
            expect(gtmService.trackEvent).not.toHaveBeenCalled();
        });

        /**
         * No pageview for /explore
         */
        it(`ignores pageview for "/explore"`, () => {

            navigation$.next(new NavigationEnd(1, "/", "/explore"));

            // Subscribe to non-dispatching event and then confirm side-effect
            effects.initPageview$.subscribe();
            expect(gtmService.trackEvent).not.toHaveBeenCalled();
        });

        /**
         * Pageview should be triggered for all non / and /explore routes.
         */
        it("triggers pageview for valid route", () => {

            navigation$.next(new NavigationEnd(1, `/${EntityName.PROJECTS}`, `/${EntityName.PROJECTS}`));

            // Confirm pageview is tracked
            effects.initPageview$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalled();
        });
    });

    describe("initSearchState$", () => {

        /**
         * Projects is set as selected entity.
         */
        it("correctly sets projects as selected entity", (done: DoneFn) => {

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false).and.returnValue(true)
                .withArgs(EntityName.FILES, false).and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

            // Return empty array, representing no filter currently selected 
            searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {}
            });

            // Navigate to /, which redirects to /projects
            navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

            // Confirm projects is the selected entity
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).selectedEntity).toEqual(EntityName.PROJECTS);
                done();
            });
        });
        
        /**
         * Samples is set as selected entity.
         */
        it("correctly sets samples as selected entity", (done: DoneFn) => {

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
                .withArgs(EntityName.FILES, false).and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false).and.returnValue(true);

            // Return empty array, representing no filter currently selected 
            searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {}
            });

            // Navigate to /samples
            navigation$.next(new NavigationEnd(1, `/${EntityName.SAMPLES}`, `/${EntityName.SAMPLES}`));

            // Confirm samples is the selected entity
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).selectedEntity).toEqual(EntityName.SAMPLES);
                done();
            });
        });

        /**
         * Files is set as selected entity.
         */
        it("correctly sets files as selected entity", (done: DoneFn) => {

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
                .withArgs(EntityName.FILES, false).and.returnValue(true)
                .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

            // Return empty array, representing no filter currently selected 
            searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {}
            });

            // Navigate to /files
            navigation$.next(new NavigationEnd(1, `/${EntityName.FILES}`, `/${EntityName.FILES}`));

            // Confirm projects is the selected entity
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).selectedEntity).toEqual(EntityName.FILES);
                done();
            });
        });

        /**
         * Default search state (genus species / homo sapiens) not set if on files tab.
         */
        it("default search state not set if filter not specified on files", (done: DoneFn) => {

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
                .withArgs(EntityName.FILES, false).and.returnValue(true)
                .withArgs(EntityName.SAMPLES, false).and.returnValue(false);

            // Return empty array, representing no filter currently selected 
            searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {}
            });

            // Navigate to /files
            navigation$.next(new NavigationEnd(1, `/${EntityName.FILES}`, `/${EntityName.FILES}`));

            // Confirm default state is not added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual([]);
                done();
            });
        });

        /**
         * Default search state (genus species / homo sapiens) not set if on samples tab.
         */
        it("default search state not set if filter not specified on samples", (done: DoneFn) => {

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false).and.returnValue(false)
                .withArgs(EntityName.FILES, false).and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false).and.returnValue(true);

            // Return empty array, representing no filter currently selected 
            searchTermUrlService.parseQueryStringSearchTerms.and.returnValue([]);

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {}
            });

            // Navigate to /samples
            navigation$.next(new NavigationEnd(1, `/${EntityName.SAMPLES}`, `/${EntityName.SAMPLES}`));

            // Confirm default state is not added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual([]);
                done();
            });
        });

        /**
         * Search state (genus species / homo sapiens) set from filter.
         */
        it("set search state from filter", (done: DoneFn) => {

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

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {}
            });

            // Navigate to /files
            navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

            // Confirm projects is the selected entity
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual(queryStringSearchTerms);
                done();
            });
        });

        /**
         * Search state (project / uuid) set from filter.
         */
        it("set project ID search state from filter", (done: DoneFn) => {

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

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {}
            });

            // Navigate to /files
            navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

            // Confirm project ID is added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).selectedSearchTerms).toEqual(queryStringSearchTerms);
                done();
            });
        });

        /**
         * Catalog is set correctly from query string param.
         */
        it("init catalog when specified in query string", (done: DoneFn) => {

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

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog
                }
            });

            // Navigate to /files
            navigation$.next(new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`));

            // Confirm project ID is added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect((dispatchedAction as SetViewStateAction).catalog).toEqual(catalog);
                done();
            });
        });

        /**
         * Catalog not set if not specified from query string param.
         * 
         * TODO Update initSearchState$ to throw error if catalog is not specified in query string.
         */
        xit(`throws error if catalog not specified in query string`, () => {});
    });
});
