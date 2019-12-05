/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectDownloadManifest.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatProgressSpinnerModule } from "@angular/material";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DataDownloadCitationComponent } from "../data-download-citation/data-download-citation.component";
import { LeftBarComponent } from "../left-bar/left-bar.component";
import { ProjectDownloadManifestComponent } from "./project-download-manifest.component";

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
