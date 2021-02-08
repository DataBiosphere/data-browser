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
import { FetchCatalogsRequestAction } from "./fetch-catalogs-request.action";
import { FetchCatalogsSuccessAction } from "./fetch-catalogs-success.action";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { GTMServiceSpy } from "../../../shared/analytics/gtm.service.spy";
import { FetchCatalogsErrorAction } from "./fetch-catalogs-error.action";
import { ErrorAction } from "../../../http/_ngrx/error.action";

describe("CatalogEffects", () => {

    let catalogService: CatalogService;
    let effects: CatalogEffects;
    let actions$: Observable<any>;
    let store: MockStore;

    const ATLAS = {
        defaultCatalog: "dcp2",
        catalogs: ["dc1", "dc2"]
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
                provideMockActions(() => actions$),
                CatalogEffects,
                CatalogService,
                ConfigService,
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
                    provide: GTMService,
                    useValue: GTMServiceSpy
                }
            ]
        });

        catalogService = TestBed.inject(CatalogService);
        effects = TestBed.inject(CatalogEffects);
        store = TestBed.inject(Store) as MockStore;
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

    xdescribe("viewCatalog$", () => {});
});
