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
import { Observable } from "rxjs";

// App dependencies
import { AtlasName } from "../atlas/atlas-name.model";
import { CatalogCanActivateGuard } from "./catalog.can-activate.guard";
import { ConfigService } from "../../config/config.service";
import { ConfigServiceSpy } from "../../config/config.service.spy";
import { DCPCatalog } from "./dcp-catalog.model";
import { AppState } from "../../_ngrx/app.state";
import { CatalogState } from "../_ngrx/catalog/catalog.state";
import { FilesState } from "../_ngrx/files.state";
import { DEFAULT_FILES_STATE, DEFAULT_PROJECTS_STATE } from "../_ngrx/files.state.mock";
import { ActivatedRouteStub } from "../../test/activated-route.stub";
import { ActivatedRouteSnapshotStub } from "../../test/activated-route-snapshot.stub";
import { RouterStateSnapshotStub } from "../../test/router-state-snapshot.stub";

describe("CatalogCanActivateGuard", () => {

    let activatedRouteSnapshot: jasmine.SpyObj<ActivatedRouteSnapshot>; // Required for canActivate
    let configService: jasmine.SpyObj<ConfigService>;
    let guard: CatalogCanActivateGuard;
    let router: jasmine.SpyObj<Router>;
    let routerStateSnapshot: jasmine.SpyObj<RouterStateSnapshot>; // Required for canActivate
    let routerStateSnapshotUrl: jasmine.Spy;
    let store: MockStore<FilesState>;

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
        configService.getAtlas.and.returnValue(AtlasName.HCA);
        
        guard = TestBed.inject(CatalogCanActivateGuard);
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        routerStateSnapshot = new RouterStateSnapshotStub() as jasmine.SpyObj<RouterStateSnapshot>;
        store = TestBed.inject(Store) as MockStore<AppState>;

        // Set up router to return stub UrlTree containing empty query params object, on parseUrl.
        router.parseUrl.and.returnValue({queryParams: {} as Params} as UrlTree);
        
        // Set up router state snapshot to return dummy URL value.
        routerStateSnapshotUrl = spyOnProperty(routerStateSnapshot, "url");
        routerStateSnapshotUrl.and.returnValue("/foo/bar");
    });

    /**
     * Navigates to error page if catalog param is not in set of catalogs for the current atlas.
     */
    it("navigates to error page if catalog is invalid", (doneFn: DoneFn) => {

        // Re-spy
        routerStateSnapshotUrl.and.returnValue("/error");

        spyOn(store, "dispatch").and.callThrough();
        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({catalog: "foo"});

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2, DCPCatalog.DCP3],
                defaultCatalog: DCPCatalog.DCP3
            }, selectedCatalog, true)
        }));

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(false);
            expect(store.dispatch).toHaveBeenCalled();
            doneFn();
        });
    });

    /**
     * Navigation continues if no catalog is specified in URL.
     */
    it("allows navigation to continue if no catalog specified in query string", (doneFn: DoneFn) => {

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2, DCPCatalog.DCP3],
                defaultCatalog: DCPCatalog.DCP3
            }, selectedCatalog, true)
        }));

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(true);
            doneFn();
        });
    });

    /**
     * Navigation continues if dcp1 is specified in the catalog query string parameter.
     */
    it(`allows navigation to continue if "dcp1" is specified in query string`, (doneFn: DoneFn) => {

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2, DCPCatalog.DCP3],
                defaultCatalog: DCPCatalog.DCP3
            }, selectedCatalog, true)
        }));

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({catalog: DCPCatalog.DCP1});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(true);
            doneFn();
        });
    });

    /**
     * A catalog query string parameter of value "dcp2" is removed.
     */
    it(`redirects if "dcp2" is specified in query string`, (doneFn: DoneFn) => {

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2, DCPCatalog.DCP3],
                defaultCatalog: DCPCatalog.DCP3
            }, selectedCatalog, true)
        }));

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({catalog: DCPCatalog.DCP2});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<UrlTree>).subscribe((urlTree) => {

            const catalogParam = urlTree.queryParams["catalog"];
            expect(catalogParam).toBeFalsy();
            doneFn();
        });
    });

    /**
     * A catalog query string parameter that is equal to the default catalog is removed.
     */
    it("removes default catalog from in query string", (doneFn: DoneFn) => {

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2, DCPCatalog.DCP3],
                defaultCatalog: DCPCatalog.DCP3
            }, selectedCatalog, true)
        }));

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({catalog: DCPCatalog.DCP3});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<UrlTree>).subscribe((urlTree) => {

            const catalogParam = urlTree.queryParams["catalog"];
            expect(catalogParam).toBeFalsy();
            doneFn();
        });
    });

    /**
     * Navigation continues if no catalog is specified in URL.
     */
    it(`allows navigation to continue with if "dcpN" is specified in query string`, (doneFn: DoneFn) => {

        // Set up default state
        const catalogDCP4 = "dcp4";
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2, DCPCatalog.DCP3, catalogDCP4],
                defaultCatalog: DCPCatalog.DCP3
            }, selectedCatalog, true)
        }));

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({catalog: catalogDCP4});

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(true);
            doneFn();
        });
    });
});
