/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of search effects.
 */

// Core dependencies
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { ClearSelectedAgeRangeAction } from "./clear-selected-age-range.action";
import { ClearSelectedTermsAction } from "./clear-selected-terms.action";
import { AgeUnit } from "../../facet/facet-age-range/age-unit.model";
import { selectSelectedEntitySpec } from "../files.selectors";
import { SearchEffects } from "./search.effects";
import { selectPreviousQuery } from "../search/search.selectors";
import { SelectFileFacetTermAction } from "./select-file-facet-term.action";
import { SelectFacetAgeRangeAction } from "./select-facet-age-range.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { GTMService } from "../../../shared/analytics/gtm.service";

describe("SearchEffects", () => {

    let gtmService: GTMService;
    let effects: SearchEffects;
    let actions$: Observable<any>;
    let store: MockStore;

    // Override selectors
    const mockSelectCatalog = DCPCatalog.DCP3;
    const mockSelectSelectedEntitySpec = {
        key: "foo",
        displayName: "foo"
    };
    const mockSelectPreviousQuery = "";

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                SearchEffects,
                provideMockActions(() => actions$),
                GTMService,
                provideMockStore({
                    initialState: {}
                }),
                {
                    provide: "Window",
                    useFactory: (() => {
                        return window;
                    })
                }
            ]
        });

        gtmService = TestBed.inject(GTMService);
        effects = TestBed.inject(SearchEffects);
        store = TestBed.inject(Store) as MockStore;

        store.overrideSelector(selectCatalog, mockSelectCatalog);
        store.overrideSelector(selectSelectedEntitySpec, mockSelectSelectedEntitySpec);
        store.overrideSelector(selectPreviousQuery, mockSelectPreviousQuery);
    });

    describe("updateSelectedSearchTerms$", () => {

        /**
         * Confirm tracking is called on clear of search, with catalog dimension.
         */
        it("tracks clear of search with catalog dimension", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new ClearSelectedTermsAction(GASource.SEARCH_RESULTS);
            actions$ = of(action);
            effects.updateSelectedSearchTerms$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                category: GACategory.SEARCH,
                action: GAAction.CLEAR,
                label: "Clear All",
                dimensions: jasmine.objectContaining({
                    [GADimension.CATALOG]: mockSelectCatalog
                })
            }));
        });

        /**
         * Confirm tracking is called on clear of search, with catalog dimension.
         */
        it("tracks clear of age range with catalog dimension", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new ClearSelectedAgeRangeAction("foo", {
                    ageMax: 100,
                    ageMin: 0,
                    ageUnit: AgeUnit.year
                
            }, GASource.SEARCH_RESULTS);
            actions$ = of(action);
            effects.updateSelectedSearchTerms$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                category: GACategory.SEARCH,
                action: GAAction.DESELECT,
                label: action.asSearchTerm().getDisplayValue(),
                dimensions: jasmine.objectContaining({
                    [GADimension.CATALOG]: mockSelectCatalog
                })
            }));
        });

        /**
         * Confirm tracking is called on clear of search, with catalog dimension.
         */
        it("tracks select of search term with catalog dimension", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action =
                new SelectFileFacetTermAction("foo", "bar", true, GASource.SEARCH_RESULTS);
            actions$ = of(action);
            effects.updateSelectedSearchTerms$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                category: GACategory.SEARCH,
                action: GAAction.SELECT,
                label: action.termName,
                dimensions: jasmine.objectContaining({
                    [GADimension.CATALOG]: mockSelectCatalog
                })
            }));
        });

        /**
         * Confirm tracking is called on select of age range, with catalog dimension.
         */
        it("tracks select of age range with catalog dimension", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new SelectFacetAgeRangeAction("foo", {
                ageMax: 100,
                ageMin: 0,
                ageUnit: AgeUnit.year

            }, GASource.SEARCH_RESULTS);
            actions$ = of(action);
            effects.updateSelectedSearchTerms$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(jasmine.objectContaining({
                category: GACategory.SEARCH,
                action: GAAction.SELECT,
                label: action.asSearchTerm().getDisplayValue(),
                dimensions: jasmine.objectContaining({
                    [GADimension.CATALOG]: mockSelectCatalog
                })
            }));
        });
    });
});
