/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing top-level app component.
 */

// Core dependencies
import { Location } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { DeviceDetectorService } from "ngx-device-detector";
import { ReplaySubject } from "rxjs";

// App dependencies
import { AppComponent } from "./app.component";
import { ConfigService } from "./config/config.service";
import { FileFacetName } from "./files/facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "./files/_ngrx/facet/set-view-state.action";
import { ReleaseBannerComponent } from "./files/releases/release-banner/release-banner.component";
import { QueryStringSearchTerm } from "./files/search/url/query-string-search-term.model";
import { SearchTermUrl } from "./files/search/url/search-term-url.model";
import { SearchTermUrlService } from "./files/search/url/search-term-url.service";
import { EntityName } from "./files/shared/entity-name.model";
import { GenusSpecies } from "./files/shared/genus-species.model";
import { LibraryConstructionApproach } from "./files/shared/library-construction-approach.model";
import { ReleaseService } from "./files/shared/release.service";
import { AnnouncementComponent } from "./shared/announcement/announcement.component";
import { ToolbarNavComponent } from "./shared/toolbar-nav/toolbar-nav.component";
import { ToolbarNavDropDownComponent } from "./shared/toolbar-nav-drop-down/toolbar-nav-drop-down.component";
import { ToolbarNavItemComponent } from "./shared/toolbar-nav-item/toolbar-nav-item.component";
import { ToolbarNavSubMenuItemComponent } from "./shared/toolbar-nav-sub-menu-item/toolbar-nav-sub-menu-item.component";
import { ToolbarNavSubMenuComponent } from "./shared/toolbar-nav-sub-menu/toolbar-nav-sub-menu.component";
import { DataPolicyFooterComponent } from "./site/data-policy-footer/data-policy-footer.component";
import { DesktopFooterComponent } from "./site/desktop-footer/desktop-footer.component";
import { HCAFooterComponent } from "./site/hca-footer/hca-footer.component";
import { HCAToolbarComponent } from "./site/hca-toolbar/hca-toolbar.component";
import { StickyFooterComponent } from "./site/sticky-footer/sticky-footer.component";
import { LocalStorageService } from "./storage/local-storage.service";
import { ActivatedRouteStub } from "./test/activated-route.stub";


describe("AppComponent:", () => {

    const PROJECTS_PATH = "/projects";
    const PROJECTS_PATH_WITH_FILTERS = "/projects?filter=%5B%7B%22facetName%22:%22libraryConstructionApproach%22,%value%22:%5B%22Smart-seq2%22%5D%7D%5D";

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    const locationSpy = jasmine.createSpyObj("Location", ["path"]);
    const storeSpy = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);
    
    const searchTermUrlService = new SearchTermUrlService();

    const navigation$ = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        events: navigation$.asObservable()
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AnnouncementComponent,
                AppComponent,
                DataPolicyFooterComponent,
                DesktopFooterComponent,
                HCAFooterComponent,
                HCAToolbarComponent,
                StickyFooterComponent,
                ToolbarNavComponent,
                ToolbarNavDropDownComponent,
                ToolbarNavItemComponent,
                ToolbarNavSubMenuComponent,
                ToolbarNavSubMenuItemComponent,
                ReleaseBannerComponent
            ],
            imports: [
                RouterTestingModule,
                MatIconModule,
                MatToolbarModule,
                RouterModule
            ],
            providers: [{
                provide: DeviceDetectorService,
                useValue: jasmine.createSpyObj("DeviceDetectorService", ["isMobile", "isTablet"])
            }, {
                provide: Store,
                useValue: storeSpy
            }, {
                provide: ActivatedRoute,
                useClass: ActivatedRouteStub
            }, {
                provide: Location,
                useValue: locationSpy
            }, {
                provide: Router,
                useValue: routerMock
            }, {
                provide: ConfigService,
                useValue: jasmine.createSpyObj("ConfigService", ["isV2", "isEnvLocal", "isEnvUxDev", "getPortalUrl"])
            }, {
                provide: LocalStorageService,
                useValue: jasmine.createSpyObj("LocalStorageService", ["get", "set"])
            }, {
                provide: ReleaseService,
                useValue: jasmine.createSpyObj("ReleaseService", ["buildReleaseView", "createReleaseDatasetView", "fetch2020MarchRelease", "isReleaseFeatureEnabled"])
            }, {
                provide: SearchTermUrlService,
                useValue: searchTermUrlService
            }]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create component", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Default to homo sapiens if there are initially no filters set.
     */
    it("defaults search terms to human if no filters set on load of app", () => {

        const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {}
        });
        locationSpy.path.and.returnValue(PROJECTS_PATH);
        navigation$.next(new NavigationEnd(1, "/", PROJECTS_PATH));

        component["setAppStateFromURL"]();

        const filters = [
            new QueryStringSearchTerm(FileFacetName.GENUS_SPECIES, [GenusSpecies.HOMO_SAPIENS])
        ];
        const setViewAction = new SetViewStateAction(EntityName.PROJECTS, filters);
        expect(storeSpy.dispatch).toHaveBeenCalledWith(setViewAction);
    });

    /**
     * Do not default to homo sapiens if there are initially filters set.
     */
    it("does not default search terms to human if filters are already set on load of app", () => {

        const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        spyOnProperty(activatedRoute, "snapshot").and.returnValue({
            queryParams: {
                filter: `[{"${SearchTermUrl.FACET_NAME}": "libraryConstructionApproach", "${SearchTermUrl.VALUE}": ["Smart-seq2"]}]`
            }
        });
        locationSpy.path.and.returnValue(PROJECTS_PATH_WITH_FILTERS);
        navigation$.next(new NavigationEnd(1, "/", PROJECTS_PATH_WITH_FILTERS));

        component["setAppStateFromURL"]();

        const filters = [
            new QueryStringSearchTerm(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, [LibraryConstructionApproach.SMART_SEQ2])
        ];
        const setViewAction = new SetViewStateAction(EntityName.PROJECTS, filters);
        expect(storeSpy.dispatch).toHaveBeenCalledWith(setViewAction);
    });

    /**
     * Tests are incomplete - review component functionality and add necessary tests.
     */
    xit("TBD", () => {
    });
});
