/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec covering catalog can activate guard.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";

// App dependencies
import { CatalogCanActivateGuard } from "./catalog.can-activate.guard";
import { ConfigService } from "../../config/config.service";
import { ConfigServiceSpy } from "../../config/config.service.spy";
import { AppState } from "../../_ngrx/app.state";
import { FileState } from "../_ngrx/file.state";
import { DEFAULT_PROJECTS_STATE } from "../_ngrx/file.state.mock";
import { ActivatedRouteStub } from "../../test/activated-route.stub";
import { ActivatedRouteSnapshotStub } from "../../test/activated-route-snapshot.stub";
import { RouterStateSnapshotStub } from "../../test/router-state-snapshot.stub";
import { Observable } from "rxjs/index";
import { Catalog } from "./catalog.model";

describe("CatalogCanActivateGuard", () => {

    let activatedRouteSnapshot: jasmine.SpyObj<ActivatedRouteSnapshot>; // Required for canActivate
    let configService: jasmine.SpyObj<ConfigService>;
    let guard: CatalogCanActivateGuard;
    let router: jasmine.SpyObj<Router>;
    let routerStateSnapshot: jasmine.SpyObj<RouterStateSnapshot>; // Required for canActivate
    let store: MockStore<FileState>;

    /**
     * Top-level set up.
     * 
     *  canActivate requires mocking of the following:
     *  1. router.parseUrl - this can be setup here for all tests
     *  2. routerStateSnapshot.url - this can be setup here for all tests
     *  3. activatedRouteSnapshot.queryParams - this is specific to each test
     */
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                { provide: ActivatedRoute, useClass: ActivatedRouteStub }, // Nested dependency
                CatalogCanActivateGuard,
                { provide: ConfigService, useValue: ConfigServiceSpy as any },
                { provide: Router, useValue: jasmine.createSpyObj("Router", ["navigate", "parseUrl"]) },
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE})
            ]
        });

        activatedRouteSnapshot = new ActivatedRouteSnapshotStub() as jasmine.SpyObj<ActivatedRouteSnapshot>;
        configService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;
        guard = TestBed.inject(CatalogCanActivateGuard);
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        routerStateSnapshot = new RouterStateSnapshotStub() as jasmine.SpyObj<RouterStateSnapshot>;
        store = TestBed.inject(Store) as MockStore<AppState>;

        // Set up router to return stub UrlTree containing empty query params object, on parseUrl.
        router.parseUrl.and.returnValue({queryParams: {} as Params} as UrlTree);
        
        // Set up router state snapshot to return dummy URL value.
        spyOnProperty(routerStateSnapshot, "url").and.returnValue("/foo/bar");
        
    });

    /**
     * v2 environments
     */
    describe("v2", () => {

        /**
         * Set environment to v2 for each test in this section.
         */
        beforeEach(() => {

            configService.isV2.and.returnValue(true);
        });

        /**
         * DCP1 should be added to routes if catalog not currently specified in URL.
         */
        it("adds default catalog if catalog not specified in query string", (doneFn: DoneFn) => {

            spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});

            const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
            (canActivate as Observable<UrlTree>).subscribe((urlTree) => {
                
                const catalogParam = urlTree.queryParams["catalog"];
                expect(catalogParam).toBeTruthy();
                expect(catalogParam).toEqual(Catalog.DCP2); // Default catalog of DEFAULT_PROJECTS_STATE is DCP2
                doneFn();
            });
        });

        /**
         * Catalog should be added if catalog is currently specified in URL.
         */
        it("doesn't add default catalog if catalog specified in query string", (doneFn: DoneFn) => {

            spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({catalog: Catalog.DCP1});

            const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
            (canActivate as Observable<boolean>).subscribe((returnValue) => {

                expect(returnValue).toEqual(true);
                doneFn();
            });
        });

        /**
         * Merges catalog param with existing params if catalog not specified in query string.
         */
        it("merges default catalog param with existing params if catalog not specified in query string", (doneFn: DoneFn) => {

            // Update router to return filter on parseUrl - we will check that filter param is maintained in UrlTree
            // object that is returned from canActivate
            const filterValue = "any";
            router.parseUrl.and.returnValue({queryParams: {"filter": filterValue} as Params} as UrlTree);

            spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});
            
            const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
            (canActivate as Observable<UrlTree>).subscribe((urlTree) => {

                const catalogParam = urlTree.queryParams["catalog"];
                expect(catalogParam).toBeTruthy();
                expect(catalogParam).toEqual(Catalog.DCP2); // Default catalog of DEFAULT_PROJECTS_STATE is DCP2
                
                const filterParam = urlTree.queryParams["filter"];
                expect(filterParam).toBeTruthy();
                expect(filterParam).toEqual(filterValue);
                
                doneFn();
            });
        });
    });

    /**
     * v1 environments
     */
    describe("v1", () => {

        /**
         * Set environment to v2 for each test in this section.
         */
        beforeEach(() => {

            configService.isV2.and.returnValue(false);
        });

        /**
         * Default catalog should not be added to routes for v1 environments.
         */
        it("doesn't add default catalog if catalog not specified in query string", () => {

            spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});
            const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
            expect(canActivate).toEqual(true);
        });


        /**
         * Default catalog should not be added to routes for v1 environments.
         */
        it("doesn't add default catalog if catalog specified in query string", () => {

            spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({catalog: Catalog.DCP1});
            const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
            expect(canActivate).toEqual(true);
        });
    });
});
