/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec covering filter can activate guard.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot, Params,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

// App dependencies
import { FileFacetName } from "../file-facet/file-facet-name.model";
import { FilterCanActivateGuard } from "./filter-can-activate.guard";
import { AppState } from "../../../_ngrx/app.state";
import { FileState } from "../../_ngrx/file.state";
import { DEFAULT_PROJECTS_STATE } from "../../_ngrx/file.state.mock";
import { selectSelectedSearchTermsBySearchKey } from "../../_ngrx/search/search.selectors";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { GenusSpecies } from "../../shared/genus-species.model";
import { ActivatedRouteSnapshotStub } from "../../../test/activated-route-snapshot.stub";
import { ActivatedRouteStub } from "../../../test/activated-route.stub";
import { RouterStateSnapshotStub } from "../../../test/router-state-snapshot.stub";

describe("FilterCanActivateGuard", () => {

    let activatedRouteSnapshot: jasmine.SpyObj<ActivatedRouteSnapshot>; // Required for canActivate
    let guard: FilterCanActivateGuard;
    let router: jasmine.SpyObj<Router>;
    let routerStateSnapshot: jasmine.SpyObj<RouterStateSnapshot>; // Required for canActivate
    let routerStateSnapshotUrl: jasmine.Spy;
    let searchTermUrlService; // No type to enable jasmine mocking (eg .and.returnValue)
    let store: MockStore<FileState>;
    
    const selectedSearchTermsByKey = new Map([
        [FileFacetName.GENUS_SPECIES, new Set([
            new SearchFacetTerm(FileFacetName.GENUS_SPECIES, GenusSpecies.HOMO_SAPIENS)
        ])]
    ]);

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                // Nested dependency
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteStub
                },
                FilterCanActivateGuard,
                SearchTermUrlService,
                {
                    provide: Router,
                    useValue: jasmine.createSpyObj("Router", ["navigate", "parseUrl"])
                },
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE}),
            ]
        });

        activatedRouteSnapshot = new ActivatedRouteSnapshotStub() as jasmine.SpyObj<ActivatedRouteSnapshot>;
        guard = TestBed.inject(FilterCanActivateGuard);
        
        routerStateSnapshot = new RouterStateSnapshotStub() as jasmine.SpyObj<RouterStateSnapshot>;
        
        // Set up router to return stub UrlTree containing empty query params object, on parseUrl.
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        router.parseUrl.and.returnValue({queryParams: {} as Params} as UrlTree);
        
        searchTermUrlService = TestBed.inject(SearchTermUrlService);
        
        store = TestBed.inject(Store) as MockStore<AppState>;

        // Set up router state snapshot to return dummy URL value.
        routerStateSnapshotUrl = spyOnProperty(routerStateSnapshot, "url");
        routerStateSnapshotUrl.and.returnValue("/foo/bar");
    });

    /**
     * Navigation continues as is if filter is not currently specified in URL and there are currently no selected search
     * terms.
     */
    it("allows navigation to continue if filter and selected search terms are both empty", (doneFn: DoneFn) => {

        store.overrideSelector(selectSelectedSearchTermsBySearchKey, new Map());
        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(true);
            doneFn();
        });
    });

    /**
     * Navigation redirects as is if filter is not currently specified but there are selected search terms.
     */
    it("redirects if filter does not match selected search terms", (doneFn: DoneFn) => {

        store.overrideSelector(selectSelectedSearchTermsBySearchKey, selectedSearchTermsByKey);
        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<UrlTree>).subscribe((urlTree) => {

            const filterParam = urlTree.queryParams["filter"];
            expect(filterParam).toBeTruthy();
            
            const expectedFilter = searchTermUrlService.stringifySearchTerms(selectedSearchTermsByKey);
            expect(filterParam).toEqual(expectedFilter);
            doneFn();
        });
    });

    /**
     * Navigation continues as is if filter is currently specified in URL and it matches the selected search terms.
     */
    it("allows navigation to continue if filter is specified in query string", (doneFn: DoneFn) => {

        store.overrideSelector(selectSelectedSearchTermsBySearchKey, selectedSearchTermsByKey);

        const filter = searchTermUrlService.stringifySearchTerms(selectedSearchTermsByKey);
        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({filter});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(true);
            doneFn();
        });
    });    
});
