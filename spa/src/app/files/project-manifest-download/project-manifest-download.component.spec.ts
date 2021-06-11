/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectDownloadManifest.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { FileLocationCopyComponent } from "../file-location/file-location-copy/file-location-copy.component";
import { FileLocationDownloadComponent } from "../file-location/file-location-download/file-location-download.component";
import { ProjectManifestDownloadComponent } from "./project-manifest-download.component";
import { SectionBarComponent } from "../section-bar/section-bar.component";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DataUseNotificationComponent } from "../../site/data-use-notification/data-use-notification.component";
import { HCADataUseNotificationComponent } from "../../site/hca/hca-data-use-notification/hca-data-use-notification.component";
import { HCADataReleasePolicyLinkComponent } from "../../site/hca/hca-data-release-policy-link/hca-data-release-policy-link.component";
import { DataReleasePolicyLinkComponent } from "../../site/data-release-policy-link/data-release-policy-link.component";

describe("ProjectDownloadManifestComponent", () => {

    let component: ProjectManifestDownloadComponent;
    let fixture: ComponentFixture<ProjectManifestDownloadComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataUseNotificationComponent,
                DataReleasePolicyLinkComponent,
                FileLocationCopyComponent,
                FileLocationDownloadComponent,
                HCADataUseNotificationComponent,
                HCADataReleasePolicyLinkComponent,
                SectionBarComponent,
                ProjectManifestDownloadComponent,
            ],
            imports: [
                ClipboardModule,
                MatIconModule,
                MatProgressSpinnerModule
            ],
            providers: [
                ConfigService,
                {
                    provide: Store,
                    useValue: testStore
                },
                {
                    provide: "Window",
                    useFactory: (() => {
                        return window;
                    })
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectManifestDownloadComponent);
        component = fixture.componentInstance;

        component.classFontName = "fontsize-m";
    }));
});
