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
import { FileState } from "../_ngrx/file.state";
import { DEFAULT_FILES_STATE, DEFAULT_PROJECTS_STATE } from "../_ngrx/file.state.mock";
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
     * Navigation continues as is if catalog is currently specified in URL.
     */
    it("allows navigation to continue if valid catalog specified in query string", (doneFn: DoneFn) => {

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                defaultCatalog: DCPCatalog.DCP1
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
     * DCP1 is added to the query string if:
     * - catalog is not currently specified in query string
     * - atlas is HCA
     * - DCP1 is in the specified set of catalogs
     */
    it(`redirects with "dcp1" if hca atlas, atlas contains "dcp1" and catalog not specified in query string`,
        (doneFn: DoneFn) => {

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                defaultCatalog: DCPCatalog.DCP1
            }, selectedCatalog, true)
        }));

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<UrlTree>).subscribe((urlTree) => {
            
            const catalogParam = urlTree.queryParams["catalog"];
            expect(catalogParam).toBeTruthy();
            expect(catalogParam).toEqual(DCPCatalog.DCP1);
            doneFn();
        });
    });

    /**
     * Selected catalog is added to the query string if:
     * - catalog is not currently specified in query string
     * - atlas is not HCA
     */
    it("redirects with selected catalog if not hca atlas and catalog not specified in query string",
        (doneFn: DoneFn) => {

            configService.getAtlas.and.returnValue("foo");

            spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});

            // Set up default state
            const selectedCatalog = DCPCatalog.DCP2;
            store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
                catalog: new CatalogState({
                    catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                    defaultCatalog: DCPCatalog.DCP1
                }, selectedCatalog, true)
            }));

            const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
            (canActivate as Observable<UrlTree>).subscribe((urlTree) => {

                const catalogParam = urlTree.queryParams["catalog"];
                expect(catalogParam).toBeTruthy();
                expect(catalogParam).toEqual(selectedCatalog);
                doneFn();
            });
        });
    
    /**
     * Selected catalog is added to the query string if:
     * - catalog is not currently specified in query string
     * - atlas is HCA
     * - DCP1 is not in the specified set of catalogs
     */
    it(`redirects with selected catalog if hca atlas, atlas doesn't contain "dcp1" and catalog not specified in query string`,
        (doneFn: DoneFn) => {

            spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});

            // Set up default state
            const selectedCatalog = DCPCatalog.DCP2;
            store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
                catalog: new CatalogState({
                    catalogs: [DCPCatalog.DCP2],
                    defaultCatalog: DCPCatalog.DCP1
                }, selectedCatalog, true)
            }));

            const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
            (canActivate as Observable<UrlTree>).subscribe((urlTree) => {

                const catalogParam = urlTree.queryParams["catalog"];
                expect(catalogParam).toBeTruthy();
                expect(catalogParam).toEqual(selectedCatalog);
                doneFn();
            });
        });

    /**
     * Merges catalog with existing params if catalog not specified in query string.
     */
    it("merges catalog with existing params if catalog not specified in query string", (doneFn: DoneFn) => {

        // Update router to return filter on parseUrl - we will check that filter param is maintained in UrlTree
        // object that is returned from canActivate
        const filterValue = "any";
        router.parseUrl.and.returnValue({queryParams: {"filter": filterValue} as Params} as UrlTree);

        // Set up default state
        const selectedCatalog = DCPCatalog.DCP2;
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                defaultCatalog: DCPCatalog.DCP1
            }, selectedCatalog, true)
        }));

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});
        spyOnProperty(activatedRouteSnapshot, "url").and.returnValue([]);
        
        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<UrlTree>).subscribe((urlTree) => {

            const catalogParam = urlTree.queryParams["catalog"];
            expect(catalogParam).toBeTruthy();
            expect(catalogParam).toEqual(DCPCatalog.DCP1); // dcp1 due to atlas = hca, dcp1 is in set of catalogs and catalog not specified in query string
            
            const filterParam = urlTree.queryParams["filter"];
            expect(filterParam).toBeTruthy();
            expect(filterParam).toEqual(filterValue);
            
            doneFn();
        });
    });

    /**
     * If there's no selected catalog in the store, then we've reached an error state. If navigation is to error
     * page, then allow it to continue as is.
     */
    it("allows navigation to error page to continue if there's no selected catalog", (doneFn: DoneFn) => {

        // Re-spy
        routerStateSnapshotUrl.and.returnValue("/error");

        spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({});
        spyOnProperty(activatedRouteSnapshot, "url").and.returnValue([{
            path: "error"
        }]);

        // Set up default state - mimic error state where catalog values are empty/string but state has been
        // initialized.
        store.setState(Object.assign({}, DEFAULT_FILES_STATE, {
            catalog: new CatalogState({
                catalogs: [],
                defaultCatalog: ""
            }, "", true)
        }));

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(true);
            doneFn();
        });
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
                catalogs: [DCPCatalog.DCP1, DCPCatalog.DCP2],
                defaultCatalog: DCPCatalog.DCP1
            }, selectedCatalog, true)
        }));

        const canActivate = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        (canActivate as Observable<boolean>).subscribe((returnValue) => {

            expect(returnValue).toEqual(false);
            expect(store.dispatch).toHaveBeenCalled();
            doneFn();
        });
    });
});
