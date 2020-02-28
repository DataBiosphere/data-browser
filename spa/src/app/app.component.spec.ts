/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing top-level app component.
 */

// Core dependencies
import { Location } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatToolbarModule } from "@angular/material";
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { ReplaySubject } from "rxjs";

// App dependencies
import { AppComponent } from "./app.component";
import { ConfigService } from "./config/config.service";
import { SetViewStateAction } from "./files/_ngrx/file-facet-list/set-view-state.action";
import { ReleaseBannerComponent } from "./files/releases/release-banner/release-banner.component";
import { FileFacetName } from "./files/shared/file-facet-name.model";
import { GenusSpecies } from "./files/shared/genus-species.model";
import { LibraryConstructionApproach } from "./files/shared/library-construction-approach.model";
import { QueryStringFacet } from "./files/shared/query-string-facet.model";
import { EntityName } from "./files/shared/entity-name.model";
import { DeviceDetectorService } from "ngx-device-detector";
import { AnnouncementComponent } from "./shared/announcement/announcement.component";
import { CCToolbarNavComponent } from "./shared/cc-toolbar-nav/cc-toolbar-nav.component";
import { CCToolbarNavItemComponent } from "./shared/cc-toolbar-nav-item/cc-toolbar-nav-item.component";
import { DesktopFooterComponent } from "./site/desktop-footer/desktop-footer.component";
import { DataPolicyFooterComponent } from "./site/data-policy-footer/data-policy-footer.component";
import { HCAFooterComponent } from "./site/hca-footer/hca-footer.component";
import { HCAToolbarComponent } from "./site/hca-toolbar/hca-toolbar.component";
import { StickyFooterComponent } from "./site/sticky-footer/sticky-footer.component";
import { LocalStorageService } from "./storage/local-storage.service";
import { ActivatedRouteStub } from "./test/activated-route.stub";


describe("AppComponent:", () => {

    const PROJECTS_PATH = "/projects";
    const PROJECTS_PATH_WITH_FILTERS = "/projects?filter=%5B%7B%22facetName%22:%22libraryConstructionApproach%22,%22terms%22:%5B%22Smart-seq2%22%5D%7D%5D";

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    const locationSpy = jasmine.createSpyObj("Location", ["path"]);
    const storeSpy = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    const navigation$ = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        events: navigation$.asObservable()
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                CCToolbarNavComponent,
                CCToolbarNavItemComponent,
                DataPolicyFooterComponent,
                DesktopFooterComponent,
                HCAFooterComponent,
                HCAToolbarComponent,
                StickyFooterComponent,
                AnnouncementComponent,
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
                useValue: jasmine.createSpyObj("ConfigService", ["getPortalURL"])
            }, {
                provide: LocalStorageService,
                useValue: jasmine.createSpyObj("LocalStorageService", ["get", "set"])
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
            new QueryStringFacet(FileFacetName.GENUS_SPECIES, [GenusSpecies.HOMO_SAPIENS])
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
                filter: `[{"facetName": "libraryConstructionApproach", "terms": ["Smart-seq2"]}]`
            }
        });
        locationSpy.path.and.returnValue(PROJECTS_PATH_WITH_FILTERS);
        navigation$.next(new NavigationEnd(1, "/", PROJECTS_PATH_WITH_FILTERS));

        component["setAppStateFromURL"]();

        const filters = [
            new QueryStringFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, [LibraryConstructionApproach.SMART_SEQ2])
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
