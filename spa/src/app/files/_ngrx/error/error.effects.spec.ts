/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ErrorEffects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable } from "rxjs";

// App dependencies
import { CatalogState } from "../catalog/catalog.state";
import { ErrorEffects } from "./error.effects";
import { ErrorAction } from "../../../http/_ngrx/error.action";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";

describe("ErrorEffects", () => {

    let actions$: Observable<any>;
    let effects: ErrorEffects;
    let store: MockStore<CatalogState>;

    const routerMock = {
        navigate: jasmine.createSpy("navigate")
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
                ErrorEffects,
                provideMockStore({initialState: CatalogState.getDefaultState()}), {
                    provide: Router,
                    useValue: routerMock
                }
            ]
        });

        effects = TestBed.inject(ErrorEffects);
    });

    describe("navigateToError$", () => {

        /**
         * Navigate to error page initiated when ErrorAction is dispatched.
         */
        it("navigates to error page on error", () => {

            const selectedCatalog = DCPCatalog.DCP1;
            actions$ = hot("-a", {
                a: new ErrorAction("error")
            });

            // Dispatch false - straight pass-through of actions
            expect(effects.navigateToError$).toBeObservable(actions$);

            // Smoke test of navigate
            expect(routerMock.navigate).toHaveBeenCalled();

            // Navigate to error
            expect(routerMock.navigate).toHaveBeenCalledWith(
                ["error"],
                jasmine.objectContaining({
                    queryParamsHandling: "preserve"
                })
            );
        });
    });
});
