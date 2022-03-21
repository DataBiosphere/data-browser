/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of analysis protocol effects.
 */

// Core dependencies
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

// App dependencies
import { AnalysisProtocolEffects } from "./analysis-protocol.effects";
import { selectCatalog } from "../catalog/catalog.selectors";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { selectPreviousQuery } from "../search/search.selectors";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { ViewAnalysisProtocolAction } from "./view-analysis-protocol.action";

describe("AnalysisProtocolEffects", () => {

    let gtmService: GTMService;
    let effects: AnalysisProtocolEffects;
    let actions$: Observable<any>;
    let store: MockStore;

    // Override selectors
    const mockSelectCatalog = DCPCatalog.DCP3;
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
                AnalysisProtocolEffects,
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
        effects = TestBed.inject(AnalysisProtocolEffects);
        store = TestBed.inject(Store) as MockStore;

        store.overrideSelector(selectCatalog, mockSelectCatalog);
        store.overrideSelector(selectPreviousQuery, mockSelectPreviousQuery);
    });

    // Reset selectors after each test
    afterEach(() => {
        store?.resetSelectors();
    });

    describe("viewAnalysisProtocol$", () => {

        /**
         * Confirm tracking is called.
         */
        it("tracks click on analysis protocol", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new ViewAnalysisProtocolAction("foo", "http://foo.com", GASource.SEARCH_RESULTS);
            actions$ = of(action);
            effects.viewAnalysisProtocol$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(action.asEvent({
                catalog: mockSelectCatalog,
                currentQuery: mockSelectPreviousQuery
            }));
        });
    });
});
