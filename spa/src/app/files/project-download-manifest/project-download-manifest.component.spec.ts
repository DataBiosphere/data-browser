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
import { DataUseNotificationComponent } from "../data-use-notification/data-use-notification.component";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { ProjectDownloadManifestComponent } from "./project-download-manifest.component";
import { SectionBarComponent } from "../section-bar/section-bar.component";
import { FileManifestService } from "../shared/file-manifest.service";

describe("ProjectDownloadManifestComponent", () => {

    let component: ProjectDownloadManifestComponent;
    let fixture: ComponentFixture<ProjectDownloadManifestComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataUseNotificationComponent,
                SectionBarComponent,
                ProjectDownloadManifestComponent,
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
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "trackRequestCohortManifest",
                        "trackDownloadCohortManifest",
                        "trackCopyToClipboardCohortManifestLink",
                        "trackDownloadProjectManifest",
                        "trackCopyToClipboardProjectManifestLink"
                    ])
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectDownloadManifestComponent);
        component = fixture.componentInstance;

        component.classFontName = "fontsize-m";
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });
});
