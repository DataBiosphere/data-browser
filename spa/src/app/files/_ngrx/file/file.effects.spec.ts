/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of file effects.
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
import { selectCatalog } from "../catalog/catalog.selectors";
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { FetchFileFileLocationRequestAction } from "./fetch-file-file-location-request.action";
import { FetchFileFileLocationSuccessAction } from "./fetch-file-file-location-success.action";
import { FileEffects } from "./file.effects";
import { FileState } from "./file.state";
import { FileLocationService } from "../../file-location/file-location.service";
import { FileLocationStatus } from "../../file-location/file-location-status.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { selectPreviousQuery } from "../search/search.selectors";

describe("FileEffects", () => {

    let fileLocationService: FileLocationService;
    let gtmService: GTMService;
    let effects: FileEffects;
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
                provideMockActions(() => actions$),
                FileEffects,
                FileLocationService,
                GTMService,
                provideMockStore({
                    initialState: {
                        file: FileState.getDefaultState()
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

        fileLocationService = TestBed.inject(FileLocationService);
        gtmService = TestBed.inject(GTMService);
        effects = TestBed.inject(FileEffects);
        store = TestBed.inject(Store) as MockStore;

        store.overrideSelector(selectCatalog, mockSelectCatalog);
        store.overrideSelector(selectPreviousQuery, mockSelectPreviousQuery);
    });

    // Reset selectors after each test
    afterEach(() => {
        store?.resetSelectors();
    });

    describe("fetchFileFileLocation$", () => {

        /**
         * Confirm file location is requested with URL from request action.
         */
        it("requests file location", () => {

            spyOn(fileLocationService, "fetchFileLocation").and.callThrough();

            const fileUrl = "http://foo.com";
            actions$ = of(new FetchFileFileLocationRequestAction(fileUrl, "bar", "baz"));
            effects.fetchFileFileLocation$.subscribe();
            expect(fileLocationService.fetchFileLocation).toHaveBeenCalledWith(
                fileUrl,
                jasmine.any(Object)
            );
        });

        /**
         * Confirm success action is dispatched with updated download status.
         */
        it("dispatches success action once file location request is initiated", () => {

            const fileLocation = {
                status: FileLocationStatus.IN_PROGRESS
            };
            spyOn(fileLocationService, "fetchFileLocation").and.returnValue(of(fileLocation));

            const fileUrl = "http://foo.com";
            actions$ = hot("--a-", {
                a: new FetchFileFileLocationRequestAction(fileUrl, "bar", "baz")
            });

            const expected = cold("--b", {
                b: new FetchFileFileLocationSuccessAction(fileUrl, fileLocation)
            });
            expect(effects.fetchFileFileLocation$).toBeObservable(expected);
        });

        /**
         * Confirm tracking is called.
         */
        it("tracks file location request", () => {

            spyOn(gtmService, "trackEvent").and.callThrough();

            const action = new FetchFileFileLocationRequestAction("http://foo.com", "bar", "baz");
            actions$ = of(action);
            effects.fetchFileFileLocation$.subscribe();
            expect(gtmService.trackEvent).toHaveBeenCalledWith(action.asEvent({
                catalog: mockSelectCatalog,
                currentQuery: mockSelectPreviousQuery
            }));
        });
    });
});
