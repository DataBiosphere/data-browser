/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ErrorEffects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { NavigationStart, Router, RouterEvent } from "@angular/router";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, ReplaySubject } from "rxjs";

// App dependencies
import { ErrorEffects } from "./error.effects";
import { HttpState } from "../../../http/_ngrx/http.state";
import { selectIsError } from "../../../http/_ngrx/http.selectors";
import { ClearErrorStateAction } from "../../../http/_ngrx/http-clear-state-error.actions";


describe("ErrorEffects", () => {

    let actions$: Observable<any>;
    let effects: ErrorEffects;
    let store: MockStore<HttpState>;

    const navigation$ = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        events: navigation$.asObservable(),
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
                provideMockStore({initialState: HttpState.getDefaultState()}), {
                    provide: Router,
                    useValue: routerMock
                }
            ]
        });

        effects = TestBed.inject(ErrorEffects);
        store = TestBed.inject(Store) as MockStore<HttpState>;
    });

    describe("clearError$", () => {

        /**
         * Clears error on navigate if app is currently in error state.
         */
        it("clears error on navigate", (doneFn: DoneFn) => {
            
            // Spy on dispatch to check that clear action is dispatched
            spyOn(store, "dispatch");
            
            // Set error state
            store.overrideSelector(selectIsError, true);

            // Navigate
            navigation$.next(new NavigationStart(1, "/", ));

            // Confirm clear action is dispatched
            effects.clearError$.subscribe((dispatchedAction) => {
                expect(dispatchedAction).toEqual(new ClearErrorStateAction());
                doneFn();
            });
        });
    });
});
