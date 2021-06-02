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

    describe("clearError$", () => {

        /**
         * Clears error on navigate if app is currently in error state.
         */
        xit("clears error on navigate", () => {});
    });
});
