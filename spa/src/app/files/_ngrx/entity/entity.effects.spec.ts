/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of entity effects.
 */

// Core dependencies
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

// App dependencies
import { BackToEntityAction } from "./back-to-entity.action";
import { selectCatalog } from "../catalog/catalog.selectors";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { EntityEffects } from "./entity.effects";
import { selectTableQueryParams } from "../files.selectors";
import { selectPreviousQuery } from "../search/search.selectors";
import { SelectEntityAction } from "./select-entity.action";
import { GTMService } from "../../../shared/analytics/gtm.service";

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
            tableModels: [{
                pagination: {} as any,
                data: [],
                loading: false,
                tableName: "foo",
                termCountsByFacetName: new Map()
            }]
        }
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
                provideMockActions(() => actions$),
                EntityEffects,
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
        effects = TestBed.inject(EntityEffects);
        store = TestBed.inject(Store) as MockStore;

        store.overrideSelector(selectCatalog, mockSelectCatalog);
        store.overrideSelector(selectTableQueryParams, mockTableQueryParams);
        store.overrideSelector(selectPreviousQuery, mockSelectPreviousQuery);
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
            expect(gtmService.trackEvent).toHaveBeenCalledWith(action.asEvent({
                catalog: mockSelectCatalog,
                currentQuery: mockSelectPreviousQuery
            }));
        });

        /**
         * Confirm tracking is called.
         */
        it("tracks click on back to entities", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new BackToEntityAction("foo");
            actions$ = of(action);
            effects.switchTabs$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(action.asEvent({
                catalog: mockSelectCatalog,
                currentQuery: mockSelectPreviousQuery
            }));
        });
    });
});
