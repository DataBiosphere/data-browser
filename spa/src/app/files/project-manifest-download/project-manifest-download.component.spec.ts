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
import { ProjectManifestDownloadComponent } from "./project-manifest-download.component";
import { SectionBarComponent } from "../section-bar/section-bar.component";

describe("ProjectDownloadManifestComponent", () => {

    let component: ProjectManifestDownloadComponent;
    let fixture: ComponentFixture<ProjectManifestDownloadComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataUseNotificationComponent,
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
