/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing top-level app component.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
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
import { UrlService } from "./files/url/url.service";
import { AnnouncementComponent } from "./shared/announcement/announcement.component";
import { ToolbarNavComponent } from "./shared/toolbar-nav/toolbar-nav.component";
import { ToolbarNavDropDownComponent } from "./shared/toolbar-nav-drop-down/toolbar-nav-drop-down.component";
import { ToolbarNavItemComponent } from "./shared/toolbar-nav-item/toolbar-nav-item.component";
import { ToolbarNavSubMenuItemComponent } from "./shared/toolbar-nav-sub-menu-item/toolbar-nav-sub-menu-item.component";
import { ToolbarNavSubMenuComponent } from "./shared/toolbar-nav-sub-menu/toolbar-nav-sub-menu.component";
import { DataPolicyFooterComponent } from "./site/data-policy-footer/data-policy-footer.component";
import { DesktopFooterComponent } from "./site/desktop-footer/desktop-footer.component";
import { HCAFooterComponent } from "./site/hca/hca-footer/hca-footer.component";
import { HCAToolbarComponent } from "./site/hca/hca-toolbar/hca-toolbar.component";
import { StickyFooterComponent } from "./site/sticky-footer/sticky-footer.component";
import { LocalStorageService } from "./storage/local-storage.service";
import { SupportRequestComponent } from "./support-request/support-request.component";
import { SITE_CONFIG_SERVICE } from "./site/site-config/site-config.token";

describe("AppComponent:", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    const storeSpy = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    const navigation$ = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        events: navigation$.asObservable(),
    };

    beforeEach(waitForAsync(() => {
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
                SupportRequestComponent,
            ],
            imports: [
                RouterTestingModule,
                MatIconModule,
                MatToolbarModule,
                RouterModule,
            ],
            providers: [
                ConfigService,
                {
                    provide: DeviceDetectorService,
                    useValue: jasmine.createSpyObj("DeviceDetectorService", [
                        "isMobile",
                        "isTablet",
                    ]),
                },
                {
                    provide: Store,
                    useValue: storeSpy,
                },
                {
                    provide: Router,
                    useValue: routerMock,
                },
                {
                    provide: LocalStorageService,
                    useValue: jasmine.createSpyObj("LocalStorageService", [
                        "get",
                        "set",
                    ]),
                },
                {
                    provide: UrlService,
                    useValue: jasmine.createSpyObj("UrlService", [
                        "isViewingEntities",
                        "isViewingFiles",
                        "isViewingProjects",
                        "isViewingSamples",
                    ]),
                },
            ],
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Tests are incomplete - review component functionality and add necessary tests.
     */
    xit("TBD", () => {});
});
