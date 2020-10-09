/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec covering projects guard.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Router, RouterEvent } from "@angular/router";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { FileState } from "../_ngrx/file.state";
import { DEFAULT_PROJECTS_STATE } from "../_ngrx/file.state.mock";
import { SearchTermUrlService } from "../search/url/search-term-url.service";
import { ReplaySubject } from "rxjs/index";
import { ProjectsCanActivateGuard } from "./projects.can-activate.guard";

describe("ProjectsCanActivateGuard", () => {

    let guard;
    let searchTermUrlService; // No type to enable jasmine mocking (eg .and.returnValue)
    let store: MockStore<FileState>;

    const navigation$ = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        events: navigation$.asObservable(),
        isActive: jasmine.createSpy("isActive"),
        navigate: jasmine.createSpy("navigate"),
        url: "projects"
    };

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                ProjectsCanActivateGuard,
                {
                    provide: SearchTermUrlService,
                    useValue: jasmine.createSpyObj("SearchTermUrlService", [
                        "getDefaultSearchState",
                        "parseQueryStringSearchTerms",
                        "stringifySearchTerms"
                    ])
                },
                {
                    provide: Router, useValue: routerMock
                },
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE}),
            ]
        });

        guard = TestBed.inject(ProjectsCanActivateGuard);
        
        searchTermUrlService = TestBed.inject(SearchTermUrlService);
        store = TestBed.inject(Store) as MockStore<AppState>; /* TODO revisit "as xxx" after upgrade to 10 */

        // TODO overrideSelector for selectCatalog, selectSelectedSearchTermsBySearchKey, selectDefaultFilterInit. see defaultSelectUrlSpecState.
    });

    /**
     * Default filter should be added to routes if default filter has not previously been initialized and there is
     * not filter specified in the query string.
     */
    xit("adds default filter on app init with no filter specified", () => {
        
        // TO DO
    });
});
