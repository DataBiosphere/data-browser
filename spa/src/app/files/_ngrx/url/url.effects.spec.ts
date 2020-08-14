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
import { Observable } from "rxjs";

// App dependencies
import { Catalog } from "../../catalog/catalog.model";
import { SelectEntityAction } from "../entity/select-entity.action";
import { AgeUnit } from "../../facet/facet-age-range/age-unit.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { DEFAULT_PROJECTS_STATE } from "../file.state.mock";
import { AppState } from "../../../_ngrx/app.state";
import { ClearSelectedAgeRangeAction } from "../search/clear-selected-age-range.action";
import { ClearSelectedTermsAction } from "../search/clear-selected-terms.action";
import { SelectFacetAgeRangeAction } from "../search/select-facet-age-range.action";
import { SelectProjectIdAction } from "../search/select-project-id.action";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { EntityName } from "../../shared/entity-name.model";
import { SelectCatalogAction } from "../table/select-catalog.action";
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
        navigate: jasmine.createSpy("navigate")
    };
    
    const defaultSelectUrlSpecState = {
        selectedEntitySpec: {} as any,
        selectedSearchTermsBySearchKey: {} as any
    };
    
    const defaultAgeRange = {
        ageMin: 0,
        ageMax: 1,
        ageUnit: AgeUnit.year
    };

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {
        
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                provideMockActions(() => actions$),
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE}), {
                    provide: Router,
                    useValue: routerMock
                },
                {
                    provide: SearchTermUrlService,
                    useValue: jasmine.createSpyObj("SearchTermUrlService", [
                        "getDefaultSearchState",
                        "parseQueryStringSearchTerms",
                        "stringifySearchTerms"
                    ])
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
                UrlEffects
            ]
        });

        effects = TestBed.inject(UrlEffects);
        searchTermUrlService = TestBed.inject(SearchTermUrlService);
        store = TestBed.inject(Store) as MockStore<AppState>; /* TODO revisit "as xxx" after upgrade to 10 */
        urlService = TestBed.inject(UrlService);

        mockSelectUrlSpecState = store.overrideSelector(selectUrlSpecState, defaultSelectUrlSpecState);
    });

    /**
     * Location is updated if user currently viewing /projects, /samples or /files.
     */
    it("updateFilterQueryParam$ - location updated if viewing entity data table", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);

        actions$ = hot("-a", {
            a: new ClearSelectedTermsAction(GASource.SELECTED_TERMS) // Use any matching action here
        });

        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();
    });

    /**
     * Location is not updated unless user is currently viewing /projects, /samples or /files.
     */
    it("updateFilterQueryParam$ - location not updated if not viewing entity data table", () => {

        // Return false from isViewingEntities to fail filter in effect
        urlService.isViewingEntities.and.returnValue(false);
        
        actions$ = hot("-a", {
            a: new ClearSelectedTermsAction(GASource.SELECTED_TERMS) // Use any matching action here
        });

        // Effect is not completed as filter on current path should fail
        const expected = hot("--");
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);
    });

    /**
     * Location is not updated unless user is currently viewing /projects, /samples or /files.
     */
    it("updateFilterQueryParam$ - clear selected terms action triggers update to location", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);

        actions$ = hot("-a", {
            a: new ClearSelectedTermsAction(GASource.SELECTED_TERMS)
        });
        
        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);
        
        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();

        // Empty array for URL segments param, null filter param
        expect(routerMock.navigate).toHaveBeenCalledWith(
            [],
            jasmine.objectContaining({
                queryParams: {
                    filter: null // Null is an explicit clear of the catalog filter
                }
            })
        );
    });

    /**
     * Clear age range action triggers update to location. 
     */
    it("updateFilterQueryParam$ - clear selected age range action triggers update to location", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);

        actions$ = hot("-a", {
            a: new ClearSelectedAgeRangeAction(
                FileFacetName.ORGANISM_AGE, 
                defaultAgeRange,
                GASource.FACET_BROWSER)
        });

        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();
    });

    /**
     * Select entity action triggers update to location.
     */
    it("updateFilterQueryParam$ - select entity action triggers update to location", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);

        actions$ = hot("-a", {
            a: new SelectEntityAction(EntityName.PROJECTS)
        });

        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();
    });
    
    /**
     * Select age range action triggers update to location.
     */
    it("updateFilterQueryParam$ - select age range action triggers update to location", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);

        actions$ = hot("-a", {
            a: new SelectFacetAgeRangeAction(FileFacetName.ORGANISM_AGE, defaultAgeRange, GASource.FACET_BROWSER)
        });

        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();
    });

    /**
     * Select project ID action triggers update to location.
     */
    it("updateFilterQueryParam$ - select project ID action triggers update to location", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);

        actions$ = hot("-a", {
            a: new SelectProjectIdAction("123abc", "short name", false, GASource.FACET_BROWSER)
        });

        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();
    });

    /**
     * Set view state action triggers update to location.
     */
    it("updateFilterQueryParam$ - set view state action triggers update to location", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);

        actions$ = hot("-a", {
            a: new SetViewStateAction(Catalog.NONE, EntityName.PROJECTS, [])
        });

        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();
    });

    /**
     * Filter is included in params when location is updated 
     */
    it("updateFilterQueryParam$ - update to location includes filter param", () => {

        // Return true from isViewingEntities to pass filter in effect
        urlService.isViewingEntities.and.returnValue(true);
        
        // Mock filter returned from search term URL service - this is the return value from the switchMap
        const filter =  `[{"facetName":"organ", "terms":["blood"]}]`;
        searchTermUrlService.stringifySearchTerms.and.returnValue(filter);
        
        actions$ = hot("-a", {
            a: new SetViewStateAction(Catalog.NONE, EntityName.PROJECTS, []) // Any action that triggers effect can be used here
        });

        const expected = hot("-b", {
            b: defaultSelectUrlSpecState
        });

        // Pass through of URL spec state from switchMap before tap
        expect(effects.updateFilterQueryParam$).toBeObservable(expected);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();

        // Empty array for URL segments param, filter param matching filter returned from search term URL service
        expect(routerMock.navigate).toHaveBeenCalledWith(
            [],
            jasmine.objectContaining({
                queryParams: {
                    filter
                }
            })
        );
    });

    /**
     * Catalog param cleared from filter if not specified.
     */
    it("updateCatalogQueryParam$ - catalog cleared from filter if not specified", () => {

        actions$ = hot("-a", {
            a: new SelectCatalogAction(Catalog.NONE)
        });

        // Dispatch false - straight pass-through of actions
        expect(effects.updateCatalogQueryParam$).toBeObservable(actions$);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();

        // Empty array for URL segments param, null filter param
        expect(routerMock.navigate).toHaveBeenCalledWith(
            [],
            jasmine.objectContaining({
                queryParams: {
                    catalog: null // Null is an explicit clear of the catalog filter
                }
            })
        );
    });

    /**
     * Catalog param set on filter if not specified.
     */
    it("updateCatalogQueryParam$ - catalog set on filter if specified", () => {

        const selectedCatalog = Catalog.DCP1;
        actions$ = hot("-a", {
            a: new SelectCatalogAction(selectedCatalog)
        });

        // Dispatch false - straight pass-through of actions
        expect(effects.updateCatalogQueryParam$).toBeObservable(actions$);

        // Smoke test of navigate
        expect(routerMock.navigate).toHaveBeenCalled();

        // Empty array for URL segments param, filter param containing catalog value
        expect(routerMock.navigate).toHaveBeenCalledWith(
            [],
            jasmine.objectContaining({
                queryParams: {
                    catalog: selectedCatalog
                }
            })
        );
    });
});
