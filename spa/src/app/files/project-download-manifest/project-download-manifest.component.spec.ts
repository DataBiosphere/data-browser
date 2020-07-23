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
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DataDownloadCitationComponent } from "../data-download-citation/data-download-citation.component";
import { LeftBarComponent } from "../left-bar/left-bar.component";
import { ProjectDownloadManifestComponent } from "./project-download-manifest.component";
import { FileManifestService } from "../shared/file-manifest.service";

describe("ProjectDownloadManifestComponent", () => {

    let component: ProjectDownloadManifestComponent;
    let fixture: ComponentFixture<ProjectDownloadManifestComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataDownloadCitationComponent,
                LeftBarComponent,
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
