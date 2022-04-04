/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of table effects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterEvent,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, ReplaySubject } from "rxjs";

// App dependencies
import { selectTerraRegistrationRequired } from "../../../auth-terra/_ngrx/terra-auth.selectors";
import { ConfigService } from "../../../config/config.service";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { FilesState } from "../files.state";
import { DEFAULT_PROJECTS_STATE } from "../files.state.mock";
import { ErrorAction } from "../../../http/_ngrx/error.action";
import { InitEffects } from "./init.effects";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { QueryStringSearchTerm } from "../../search/url/query-string-search-term.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { EntityName } from "../../shared/entity-name.model";
import { GenusSpecies } from "../../shared/genus-species.model";
import { ActivatedRouteStub } from "../../../test/activated-route.stub";

describe("Init Effects", () => {
    let actions$: Observable<any>;
    let activatedRoute; // No type to enable jasmine mocking (eg .and.returnValue)
    let effects: InitEffects;
    let configService;
    let gtmService; // No type to enable jasmine mocking (eg .and.returnValue)
    let searchTermUrlService; // No type to enable jasmine mocking (eg .and.returnValue)
    let store: MockStore<FilesState>;

    const navigation$ = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        events: navigation$.asObservable(),
        isActive: jasmine.createSpy("isActive"),
        navigate: jasmine.createSpy("navigate"),
        url: "projects",
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
                ConfigService,
                InitEffects,
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent",
                    ]),
                },
                SearchTermUrlService,
                provideMockActions(() => actions$),
                {
                    provide: Router,
                    useValue: routerMock,
                },
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteStub,
                },
                provideMockStore({ initialState: DEFAULT_PROJECTS_STATE }),
            ],
        });

        activatedRoute = TestBed.inject(ActivatedRoute);
        effects = TestBed.inject(InitEffects);

        configService = TestBed.inject(ConfigService);
        gtmService = TestBed.inject(GTMService);

        searchTermUrlService = TestBed.inject(SearchTermUrlService);

        store = TestBed.inject(
            Store
        ) as MockStore<FilesState>; /* TODO revisit "as xxx" after upgrade to 10 */
    });

    // Reset selectors after each test
    afterEach(() => {
        store?.resetSelectors();
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
            navigation$.next(
                new NavigationEnd(
                    1,
                    `/${EntityName.PROJECTS}`,
                    `/${EntityName.PROJECTS}`
                )
            );

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
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(true)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(false);

            // Return empty array, representing no filter currently selected
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue([]);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });

            // Navigate to /, which redirects to /projects
            navigation$.next(
                new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`)
            );

            // Confirm projects is the selected entity
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).selectedEntity
                ).toEqual(EntityName.PROJECTS);
                done();
            });
        });

        /**
         * Samples is set as selected entity.
         */
        it("correctly sets samples as selected entity", (done: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(false)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(true);

            // Return empty array, representing no filter currently selected
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue([]);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });
            // Navigate to /samples
            navigation$.next(
                new NavigationEnd(
                    1,
                    `/${EntityName.SAMPLES}`,
                    `/${EntityName.SAMPLES}`
                )
            );

            // Confirm samples is the selected entity
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).selectedEntity
                ).toEqual(EntityName.SAMPLES);
                done();
            });
        });

        /**
         * Files is set as selected entity.
         */
        it("correctly sets files as selected entity", (done: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(false)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(true)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(false);

            // Return empty array, representing no filter currently selected
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue([]);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });
            // Navigate to /files
            navigation$.next(
                new NavigationEnd(
                    1,
                    `/${EntityName.FILES}`,
                    `/${EntityName.FILES}`
                )
            );

            // Confirm projects is the selected entity
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).selectedEntity
                ).toEqual(EntityName.FILES);
                done();
            });
        });

        /**
         * Default search state (genus species / homo sapiens) not set if on files tab.
         */
        it("doesn't set default search state if filter not specified on files", (done: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(false)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(true)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(false);

            // Return empty array, representing no filter currently selected
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue([]);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });

            // Navigate to /files
            navigation$.next(
                new NavigationEnd(
                    1,
                    `/${EntityName.FILES}`,
                    `/${EntityName.FILES}`
                )
            );

            // Confirm default state is not added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).selectedSearchTerms
                ).toEqual([]);
                done();
            });
        });

        /**
         * Default search state (genus species / homo sapiens) not set if on samples tab.
         */
        it("doesn't set default search state if filter not specified on samples", (done: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "samples"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(false)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(true);

            // Return empty array, representing no filter currently selected
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue([]);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });

            // Navigate to /samples
            navigation$.next(
                new NavigationEnd(
                    1,
                    `/${EntityName.SAMPLES}`,
                    `/${EntityName.SAMPLES}`
                )
            );

            // Confirm default state is not added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).selectedSearchTerms
                ).toEqual([]);
                done();
            });
        });

        /**
         * Search state (genus species / homo sapiens) set from filter.
         */
        it("sets search state from filter", (done: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "projects"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(true)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(false);

            // Set up search terms in query string
            const queryStringSearchTerms = [
                new QueryStringSearchTerm(FileFacetName.GENUS_SPECIES, [
                    GenusSpecies.MUS_MUSCULUS,
                ]),
            ];
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue(queryStringSearchTerms);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });

            // Navigate to /projects
            navigation$.next(
                new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`)
            );

            // Confirm search terms are added to the action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).selectedSearchTerms
                ).toEqual(queryStringSearchTerms);
                done();
            });
        });

        /**
         * Search state (project / uuid) set from filter.
         */
        it("sets project ID search state from filter", (done: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "projects"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(true)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(false);

            // Set up project ID in query string
            const queryStringSearchTerms = [
                new QueryStringSearchTerm(FileFacetName.PROJECT_ID, ["foo"]),
            ];
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue(queryStringSearchTerms);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });

            // Navigate to /projects
            navigation$.next(
                new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`)
            );

            // Confirm project ID is added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).selectedSearchTerms
                ).toEqual(queryStringSearchTerms);
                done();
            });
        });

        /**
         * Catalog is set correctly from query string param.
         */
        it("inits catalog when specified in query string", (done: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "projects"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(true)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(false);

            // Return empty array, representing no filter currently selected
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue([]);

            // Set catalog param
            const catalog = DCPCatalog.DCP1;
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {
                    catalog,
                },
            });

            // Navigate to /projects
            navigation$.next(
                new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`)
            );

            // Confirm catalog is added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).catalog
                ).toEqual(catalog);
                done();
            });
        });

        /**
         * Default catalog is set when no catalog is specified in query string.
         */
        it(`inits with default catalog if catalog not specified in query string`, (doneFn: DoneFn) => {
            store.overrideSelector(selectTerraRegistrationRequired, false);

            // Return true if isActive is called with "projects"
            routerMock.isActive
                .withArgs(EntityName.PROJECTS, false)
                .and.returnValue(true)
                .withArgs(EntityName.FILES, false)
                .and.returnValue(false)
                .withArgs(EntityName.SAMPLES, false)
                .and.returnValue(false);

            // Return default catalog from config
            const defaultCatalog = DCPCatalog.DCP3;
            spyOn(configService, "getDefaultCatalog").and.returnValue(
                defaultCatalog
            );

            // Return empty array, representing no filter currently selected
            spyOn(
                searchTermUrlService,
                "parseQueryStringSearchTerms"
            ).and.returnValue([]);

            // Return empty query string params (this mocking is required for pulling catalog value from params)
            spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                queryParams: {},
            });

            // Navigate to /projects
            navigation$.next(
                new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`)
            );

            // Confirm catalog is added to action
            effects.initSearchState$.subscribe((dispatchedAction) => {
                expect(
                    (dispatchedAction as SetViewStateAction).catalog
                ).toEqual(defaultCatalog);
                doneFn();
            });
        });

        /**
         * Error action not dispatched if catalog not specified in query string but navigating to error page.
         */
        xit(`does not dispatch error if catalog not specified in query string on navigate to error page`, () => {});

        describe("filter parse error", () => {
            const parseErrorFilters = ["foo", "{}", "[]"];

            parseErrorFilters.forEach((filter) => {
                /**
                 * Error action dispatched on non JSON filter is specified in query string.
                 */
                it(`dispatches error for invalid filter: ${filter}`, (doneFn: DoneFn) => {
                    store.overrideSelector(
                        selectTerraRegistrationRequired,
                        false
                    );

                    // Return true if isActive is called with "projects"
                    routerMock.isActive
                        .withArgs(EntityName.PROJECTS, false)
                        .and.returnValue(true)
                        .withArgs(EntityName.FILES, false)
                        .and.returnValue(false)
                        .withArgs(EntityName.SAMPLES, false)
                        .and.returnValue(false);

                    // Set up invalid filter in query string params
                    spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                        queryParams: {
                            filter,
                        },
                    });

                    // Navigate to /projects
                    navigation$.next(
                        new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`)
                    );

                    // Confirm error is dispatched
                    const expectedErrorMessage = `${searchTermUrlService["ERROR_TEXT_PARSE"]} "${searchTermUrlService["PARAM_FILTER"]}": ${filter}`;
                    effects.initSearchState$.subscribe((dispatchedAction) => {
                        expect(dispatchedAction).toEqual(
                            new ErrorAction(expectedErrorMessage)
                        );
                        doneFn();
                    });
                });
            });
        });

        describe("filter syntax error", () => {
            const syntaxErrorFilters = [
                `[{"terms":""}]`,
                `[{"facetName":"foo"}]`,
                `[{"facetName":"foo","terms":"bar"}]`,
                `[{"facetName":"foo", "terms": [{}]}]`,
                `[{"facetName":"foo","terms":[{"ageMin":0}]}]`,
            ];

            syntaxErrorFilters.forEach((filter) => {
                /**
                 * Error action dispatched on non JSON filter is specified in query string.
                 */
                it(`dispatches error for invalid filter: ${filter}`, (doneFn: DoneFn) => {
                    store.overrideSelector(
                        selectTerraRegistrationRequired,
                        false
                    );

                    // Return true if isActive is called with "projects"
                    routerMock.isActive
                        .withArgs(EntityName.PROJECTS, false)
                        .and.returnValue(true)
                        .withArgs(EntityName.FILES, false)
                        .and.returnValue(false)
                        .withArgs(EntityName.SAMPLES, false)
                        .and.returnValue(false);

                    // Set up invalid filter in query string params
                    spyOnProperty(activatedRoute, "snapshot").and.returnValue({
                        queryParams: {
                            filter,
                        },
                    });

                    // Navigate to /projects
                    navigation$.next(
                        new NavigationEnd(1, "/", `/${EntityName.PROJECTS}`)
                    );

                    // Confirm error is dispatched
                    const expectedErrorMessage = `${searchTermUrlService["ERROR_TEXT_SYNTAX"]} "${searchTermUrlService["PARAM_FILTER"]}": ${filter}`;
                    effects.initSearchState$.subscribe((dispatchedAction) => {
                        expect(dispatchedAction).toEqual(
                            new ErrorAction(expectedErrorMessage)
                        );
                        doneFn();
                    });
                });
            });
        });

        /**
         * Prevent view init (eg hits to entities endpoint and summary endpoint) if an error has occurred during init.
         */
        xit("prevents view init on error", () => {});
    });
});
