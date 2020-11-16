/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing top-level app component.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterEvent, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { DeviceDetectorService } from "ngx-device-detector";
import { ReplaySubject } from "rxjs";

// App dependencies
import { AppComponent } from "./app.component";
import { ConfigService } from "./config/config.service";
import { ReleaseBannerComponent } from "./files/releases/release-banner/release-banner.component";
import { ReleaseService } from "./files/shared/release.service";
import { UrlService } from "./files/url/url.service";
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
import { SupportRequestComponent } from "./support-request/support-request.component";


describe("AppComponent:", () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    const storeSpy = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);
    
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
                ReleaseBannerComponent,
                SupportRequestComponent
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
                provide: UrlService,
                useValue: jasmine.createSpyObj("ReleaseService", ["isViewingEntities", "isViewingFiles", "isViewingProjects", "isViewingSamples"])
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
     * Tests are incomplete - review component functionality and add necessary tests.
     */
    xit("TBD", () => {
    });
});
