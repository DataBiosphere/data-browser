/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of entity effects.
 */

// Core dependencies
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

// App dependencies
import { LoginSuccessAction } from "../../../auth/_ngrx/login-success.action";
import { LogoutSuccessAction } from "../../../auth/_ngrx/logout-success.action";
import { BackToEntityAction } from "./back-to-entity.action";
import { selectCatalog } from "../catalog/catalog.selectors";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { ClearEntitiesAction } from "./clear-entities.action";
import { EntityEffects } from "./entity.effects";
import { selectTableQueryParams } from "../files.selectors";
import { selectPreviousQuery } from "../search/search.selectors";
import { SelectEntityAction } from "./select-entity.action";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { EntityName } from "../../shared/entity-name.model";

describe("EntityEffects", () => {
    let gtmService: GTMService;
    let effects: EntityEffects;
    let actions$: Observable<any>;
    let store: MockStore;

    // Override selectors
    const mockSelectCatalog = DCPCatalog.DCP3;
    const mockTableQueryParams = {
        selectedSearchTermsBySearchKey: new Map(),
        pagination: {} as any,
        tableState: {
            entitySpecs: [],
            selectedEntity: "foo",
            selectedProject: null,
            tableModels: [
                {
                    pagination: {} as any,
                    data: [],
                    loading: false,
                    tableName: "foo",
                    termCountsByFacetName: new Map(),
                },
            ],
        },
    };
    const mockSelectPreviousQuery = "";

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                provideMockActions(() => actions$),
                EntityEffects,
                GTMService,
                provideMockStore({
                    initialState: {},
                }),
                {
                    provide: "Window",
                    useFactory: () => {
                        return window;
                    },
                },
            ],
        });

        gtmService = TestBed.inject(GTMService);
        effects = TestBed.inject(EntityEffects);
        store = TestBed.inject(Store) as MockStore;

        store.overrideSelector(selectCatalog, mockSelectCatalog);
        store.overrideSelector(selectTableQueryParams, mockTableQueryParams);
        store.overrideSelector(selectPreviousQuery, mockSelectPreviousQuery);
    });

    // Reset selectors after each test
    afterEach(() => {
        store?.resetSelectors();
    });

    // TODO update to include Terra registration functionality
    xdescribe("onLogin$", () => {
        /**
         * Login action triggers clear of cached data followed by a select PROJECTS entity action.
         */
        it("clears and reloads projects data on login", () => {
            // The select project action is translated into a fetch file facets action, with the update project table flag
            // set to false
            actions$ = hot("--a-", {
                a: new LoginSuccessAction({} as any),
            });

            const expected = cold("--(bc)", {
                b: new ClearEntitiesAction(),
                c: new SelectEntityAction(EntityName.PROJECTS),
            });

            expect(effects.onLogin$).toBeObservable(expected);
        });
    });

    describe("onLogout$", () => {
        /**
         * Logout action triggers clear of cached data followed by a select PROJECTS entity action.
         */
        it("clears and reloads projects data on logout", () => {
            // The select project action is translated into a fetch file facets action, with the update project table flag
            // set to false
            actions$ = hot("--a-", {
                a: new LogoutSuccessAction(),
            });

            const expected = cold("--(bc)", {
                b: new ClearEntitiesAction(),
                c: new SelectEntityAction(EntityName.PROJECTS),
            });

            expect(effects.onLogout$).toBeObservable(expected);
        });
    });

    describe("switchTabs$", () => {
        /**
         * Confirm tracking is called.
         */
        it("tracks click on entity", () => {
            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new SelectEntityAction("foo");
            actions$ = of(action);
            effects.switchTabs$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(
                action.asEvent({
                    catalog: mockSelectCatalog,
                    currentQuery: mockSelectPreviousQuery,
                })
            );
        });

        /**
         * Confirm tracking is called.
         */
        it("tracks click on back to entities", () => {
            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new BackToEntityAction("foo");
            actions$ = of(action);
            effects.switchTabs$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(
                action.asEvent({
                    catalog: mockSelectCatalog,
                    currentQuery: mockSelectPreviousQuery,
                })
            );
        });
    });
});
