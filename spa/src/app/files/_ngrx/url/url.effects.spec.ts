/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of URL effects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

// App dependencies
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { SelectCatalogAction } from "../catalog/select-catalog.action";
import { SelectEntityAction } from "../entity/select-entity.action";
import { AgeUnit } from "../../facet/facet-age-range/age-unit.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { DEFAULT_PROJECTS_STATE } from "../files.state.mock";
import { AppState } from "../../../_ngrx/app.state";
import { ClearSelectedAgeRangeAction } from "../search/clear-selected-age-range.action";
import { ClearSelectedTermsAction } from "../search/clear-selected-terms.action";
import { SelectFacetAgeRangeAction } from "../search/select-facet-age-range.action";
import { SelectProjectIdAction } from "../search/select-project-id.action";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { EntityName } from "../../shared/entity-name.model";
import { RoutingService } from "../../../shared/routing/routing.service";
import { UrlEffects } from "./url.effects";
import { selectUrlSpecState } from "./url.selectors";
import { UrlService } from "../../url/url.service";

describe("URL Effects", () => {
    let actions$: Observable<any>;
    let effects: UrlEffects;
    let mockSelectUrlSpecState;
    let searchTermUrlService; // No type to enable jasmine mocking (eg .and.returnValue)
    let store: MockStore<AppState>;
    let urlService; // No type to enable jasmine mocking (eg .and.returnValue)

    const routerMock = {
        navigate: jasmine.createSpy("navigate"),
    };

    const defaultSelectUrlSpecState = {
        selectedEntitySpec: {} as any,
        selectedSearchTermsBySearchKey: {} as any,
    };

    const defaultAgeRange = {
        ageMin: 0,
        ageMax: 1,
        ageUnit: AgeUnit.year,
    };

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideMockActions(() => actions$),
                RoutingService,
                provideMockStore({ initialState: DEFAULT_PROJECTS_STATE }),
                {
                    provide: Router,
                    useValue: routerMock,
                },
                {
                    provide: SearchTermUrlService,
                    useValue: jasmine.createSpyObj("SearchTermUrlService", [
                        "getDefaultSearchState",
                        "parseQueryStringSearchTerms",
                        "stringifySearchTerms",
                    ]),
                },
                {
                    provide: UrlService,
                    useValue: jasmine.createSpyObj("UrlService", [
                        "isViewingEntities",
                        "isViewingExport",
                        "isViewingFiles",
                        "isViewingProjects",
                        "isViewingSamples",
                    ]),
                },
                UrlEffects,
            ],
        });

        effects = TestBed.inject(UrlEffects);
        searchTermUrlService = TestBed.inject(SearchTermUrlService);
        store = TestBed.inject(Store) as MockStore<AppState>;
        urlService = TestBed.inject(UrlService);

        mockSelectUrlSpecState = store.overrideSelector(
            selectUrlSpecState,
            defaultSelectUrlSpecState
        );
    });

    // Reset selectors after each test
    afterEach(() => {
        store?.resetSelectors();
    });

    describe("navigateToSelectedEntity$", () => {
        /**
         * Select entity action triggers update to location.
         */
        it("select entity action triggers update to location", () => {
            actions$ = of(new SelectEntityAction(EntityName.PROJECTS));
            effects.navigateToSelectedEntity$.subscribe();
            expect(routerMock.navigate).toHaveBeenCalled();
        });

        /**
         * Select entity action triggers update to path.
         */
        it("select entity action triggers update to path", () => {
            const selectedEntityName = EntityName.PROJECTS;
            actions$ = of(new SelectEntityAction(selectedEntityName));
            effects.navigateToSelectedEntity$.subscribe();
            expect(routerMock.navigate).toHaveBeenCalledWith(
                [selectedEntityName], // Single token in path array that equals selected entity
                jasmine.any(Object)
            );
        });
    });

    describe("updateFilterQueryParam$", () => {
        /**
         * Location is updated if user currently viewing /projects, /samples or /files.
         */
        it("location updated if viewing entity data table", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create clear action
            const action = new ClearSelectedTermsAction(
                GASource.SELECTED_TERMS
            ); // Use any matching action here

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();
        });

        /**
         * Location is updated if user currently viewing /export.
         */
        it("location updated if viewing export flow", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingExport.and.returnValue(true);

            // Create clear action
            const action = new ClearSelectedTermsAction(
                GASource.SELECTED_TERMS
            ); // Use any matching action here

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();
        });

        /**
         * Location is not updated unless user is currently viewing /projects, /samples or /files, or /get-data.
         */
        it("location not updated if not viewing entity data table or export flow", () => {
            // Return false from isViewingEntities to fail filter in effect
            urlService.isViewingEntities.and.returnValue(false);
            urlService.isViewingExport.and.returnValue(false);

            actions$ = hot("-a", {
                a: new ClearSelectedTermsAction(GASource.SELECTED_TERMS), // Use any matching action here
            });

            // Effect is not completed as filter on current path should fail
            const expected = hot("--");
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);
        });

        /**
         * Location is not updated unless user is currently viewing /projects, /samples or /files.
         */
        it("clear selected terms action triggers update to location", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create clear action
            const action = new ClearSelectedTermsAction(
                GASource.SELECTED_TERMS
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();

            // Empty array for URL segments param, null filter param
            expect(routerMock.navigate).toHaveBeenCalledWith(
                [],
                jasmine.objectContaining({
                    queryParams: {
                        filter: null, // Null is an explicit clear of the catalog filter
                    },
                })
            );
        });

        /**
         * Path is not updated on clear of search terms.
         */
        it("does not update path on clear of search terms", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create clear action
            const action = new ClearSelectedTermsAction(
                GASource.SELECTED_TERMS
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Expect navigate to have been called with update path
            expect(routerMock.navigate).toHaveBeenCalledWith(
                [], // No update to path
                jasmine.any(Object)
            );
        });

        /**
         * Clear age range action triggers update to location.
         */
        it("clear selected age range action triggers update to location", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create clear action
            const action = new ClearSelectedAgeRangeAction(
                FileFacetName.ORGANISM_AGE,
                defaultAgeRange,
                GASource.FACET_BROWSER
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();
        });

        /**
         * Clear age range action does not trigger update to path.
         */
        it("does not update path on clear of age range", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create clear action
            const action = new ClearSelectedAgeRangeAction(
                FileFacetName.ORGANISM_AGE,
                defaultAgeRange,
                GASource.FACET_BROWSER
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Expect navigate to have been called with update path
            expect(routerMock.navigate).toHaveBeenCalledWith(
                [], // No update to path
                jasmine.any(Object)
            );
        });

        /**
         * Select age range action triggers update to location.
         */
        it("select age range action triggers update to location", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create select age range action
            const action = new SelectFacetAgeRangeAction(
                FileFacetName.ORGANISM_AGE,
                defaultAgeRange,
                GASource.FACET_BROWSER
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();
        });

        /**
         * Select age range action does not trigger update to path.
         */
        it("does not update path on select of age range", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create select age range action
            const action = new SelectFacetAgeRangeAction(
                FileFacetName.ORGANISM_AGE,
                defaultAgeRange,
                GASource.FACET_BROWSER
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Expect navigate to have been called with update path
            expect(routerMock.navigate).toHaveBeenCalledWith(
                [], // No update to path
                jasmine.any(Object)
            );
        });

        /**
         * Select project ID action triggers update to location.
         */
        it("select project ID action triggers update to location", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create select project ID action
            const action = new SelectProjectIdAction(
                "123abc",
                "short name",
                false,
                GASource.FACET_BROWSER
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();
        });

        /**
         * Select project ID action does not trigger update to path.
         */
        it("does not update path on select of project ID", () => {
            // Return true from isViewingEntities to pass filter in effect
            urlService.isViewingEntities.and.returnValue(true);

            // Create select project ID action
            const action = new SelectProjectIdAction(
                "123abc",
                "short name",
                false,
                GASource.FACET_BROWSER
            );

            actions$ = hot("-a", {
                a: action,
            });

            const expected = hot("-b", {
                b: defaultSelectUrlSpecState,
            });

            // Pass through of URL spec state from concatMap/combineWithLatest before tap
            expect(effects.updateFilterQueryParam$).toBeObservable(expected);

            // Expect navigate to have been called with update path
            expect(routerMock.navigate).toHaveBeenCalledWith(
                [], // No update to path
                jasmine.any(Object)
            );
        });
    });

    describe("updateCatalogQueryParam$", () => {
        /**
         * Catalog param set in query string.
         */
        it("updates query string with new catalog value", () => {
            const selectedCatalog = DCPCatalog.DCP1;
            actions$ = of(new SelectCatalogAction(selectedCatalog));

            // Dispatch false - straight pass-through of actions
            effects.updateCatalogQueryParam$.subscribe();

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();

            // Empty array for URL segments param, filter param containing catalog value
            expect(routerMock.navigate).toHaveBeenCalledWith(
                [],
                jasmine.objectContaining({
                    queryParams: {
                        catalog: selectedCatalog,
                    },
                })
            );
        });
    });
});
