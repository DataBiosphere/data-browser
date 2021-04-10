/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of catalog effects.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of, throwError } from "rxjs";

// App dependencies
import { CatalogEffects } from "./catalog.effects";
import { CatalogState } from "./catalog.state";
import { CatalogService } from "../../catalog/catalog.service";
import { ConfigService } from "../../../config/config.service";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { FetchCatalogsErrorAction } from "./fetch-catalogs-error.action";
import { FetchCatalogsRequestAction } from "./fetch-catalogs-request.action";
import { FetchCatalogsSuccessAction } from "./fetch-catalogs-success.action";
import { ErrorAction } from "../../../http/_ngrx/error.action";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { ViewCatalogAction } from "./view-catalog.action";
import { selectCatalog } from "./catalog.selectors";

describe("CatalogEffects", () => {

    let catalogService: CatalogService;
    let gtmService: GTMService;
    let effects: CatalogEffects;
    let actions$: Observable<any>;
    let store: MockStore;

    const ATLAS = {
        defaultCatalog: DCPCatalog.DCP2,
        catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2]
    };

    // Override selectors
    const mockSelectCatalog = DCPCatalog.DCP3;

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                // any modules needed
            ],
            providers: [
                provideMockActions(() => actions$),
                CatalogEffects,
                CatalogService,
                ConfigService,
                GTMService,
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj("HttpClient", ["get"])
                },
                provideMockStore({
                    initialState: {
                        catalog: CatalogState.getDefaultState()
                    }
                }),
                {
                    provide: "Window",
                    useFactory: (() => {
                        return window;
                    })
                }
            ]
        });

        catalogService = TestBed.inject(CatalogService);
        gtmService = TestBed.inject(GTMService);
        effects = TestBed.inject(CatalogEffects);
        store = TestBed.inject(Store) as MockStore;

        store.overrideSelector(selectCatalog, mockSelectCatalog);
    });

    describe("fetchCatalogs$", () => {

        /**
         * Service is called on request action.
         */
        it("calls service method to fetch catalogs", () => {

            spyOn(catalogService, "fetchCatalogs").and.returnValue(of(ATLAS));
            
            actions$ = of(new FetchCatalogsRequestAction());
            effects.fetchCatalogs$.subscribe();
            expect(catalogService.fetchCatalogs).toHaveBeenCalled();
        });

        /**
         * Fetch success action is dispatched
         */
        it("dispatches fetch success action", () => {

            actions$ = hot("--a-", {
                a: new FetchCatalogsRequestAction()
            });

            spyOn(catalogService, "fetchCatalogs").and.returnValue(of(ATLAS));

            const expected = cold("--b", {
                b: new FetchCatalogsSuccessAction(ATLAS)
            });

            expect(effects.fetchCatalogs$).toBeObservable(expected);
        });

        /**
         * Error actions are dispatched on error
         */
        it("dispatches error actions on error", () => {

            actions$ = hot("--a-", {
                a: new FetchCatalogsRequestAction()
            });

            const errorMessage = "error";
            spyOn(catalogService, "fetchCatalogs").and.returnValue(throwError(errorMessage));

            const expected = cold("--(bc)", {
                b: new FetchCatalogsErrorAction(),
                c: new ErrorAction(errorMessage)
            });

            expect(effects.fetchCatalogs$).toBeObservable(expected);
        });
    });

    describe("viewCatalog$", () => {

        /**
         * Confirm tracking is called.
         */
        it("tracks view of catalog", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new ViewCatalogAction("foo");
            actions$ = of(action);
            effects.viewCatalog$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(action.asEvent({
                catalog: mockSelectCatalog
            }));
        });
    });
});
