/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectMetadata.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { DataUseNotificationComponent } from "../data-use-notification/data-use-notification.component";
import { FileLocationCopyComponent } from "../file-location/file-location-copy/file-location-copy.component";
import { FileLocationDownloadComponent } from "../file-location/file-location-download/file-location-download.component";
import { PROJECT_DETAIL_SINGLE_VALUES } from "../project/hca-project-mapper.mock";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { ProjectManifestDownloadComponent } from "../project-manifest-download/project-manifest-download.component";
import { ProjectMetadataComponent } from "./project-metadata.component";
import { SectionBarComponent } from "../section-bar/section-bar.component";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";

describe("ProjectMetadataComponent", () => {

    let component: ProjectMetadataComponent;
    let fixture: ComponentFixture<ProjectMetadataComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Heading labels
    const HEADING_PROJECT_METADATA = "Project Metadata";

    // Component input property
    const INPUT_PROPERTY_PROJECT = "project";

    // Selectors
    const SELECTOR_H2 = "h2.fontsize-xl";
    const SELECTOR_PROJECT_DOWNLOAD_MANIFEST = "project-manifest-download";

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataUseNotificationComponent,
                FileLocationCopyComponent,
                FileLocationDownloadComponent,
                SectionBarComponent,
                ProjectManifestDownloadComponent,
                ProjectMetadataComponent,
            ],
            imports: [
                ClipboardModule,
                MatIconModule,
                MatProgressSpinnerModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        parent: {
                            snapshot: {
                                paramMap: jasmine.createSpyObj("paramMap", ["get"])
                            }
                        }
                    }
                },
                ConfigService,
                {
                    provide: ProjectDetailService,
                    useValue: jasmine.createSpyObj("ProjectDetailService", [
                        "addProjectMeta",
                        "removeProjectMeta",
                        "trackTabView"
                    ])
                },
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

        fixture = TestBed.createComponent(ProjectMetadataComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm "Project Metadata" is displayed.
     */
   it(`displays "Project Metadata"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of({}) // file location - required for nested ProjectManifestDownloadComponent
        );

        fixture.detectChanges();

        // Confirm title is displayed
        expect(getDEInnerHtmlText(SELECTOR_H2)).toEqual(HEADING_PROJECT_METADATA);
    });

    /**
     * Confirm component project-download-manifest is displayed.
     */
    it("displays component project-download-manifest", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of({}) // file location - required for nested ProjectManifestDownloadComponent
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(getDebugElement(SELECTOR_PROJECT_DOWNLOAD_MANIFEST)).toBeDefined();
    });

    /**
     * Confirm project ID is displayed.
     */
    it("displays input property project id", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of({}) // file location - required for nested ProjectManifestDownloadComponent
        );

        fixture.detectChanges();

        // Confirm input property value
        const projectInput = getComponentInputPropertyValue(SELECTOR_PROJECT_DOWNLOAD_MANIFEST, INPUT_PROPERTY_PROJECT); 
        expect(projectInput.entryId).toEqual(PROJECT_DETAIL_SINGLE_VALUES.entryId);
    });

    /**
     * Confirm project title is displayed.
     */
    it("displays input property project title", () => {

        testStore.pipe.and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of({}) // file location - required for nested ProjectManifestDownloadComponent
        );

        fixture.detectChanges();

        // Confirm input property value
        const projectInput = getComponentInputPropertyValue(SELECTOR_PROJECT_DOWNLOAD_MANIFEST, INPUT_PROPERTY_PROJECT);
        expect(projectInput.projectTitle).toEqual(PROJECT_DETAIL_SINGLE_VALUES.projectTitle);
    });

    /**
     * Returns the component input property value specified by input property.
     *
     * @param {string} selector
     * @param {string} inputProperty
     * @returns {any}
     */
    function getComponentInputPropertyValue(selector: string, inputProperty: string): any {

        const de = getDebugElement(selector);

        if ( !de ) {

            return;
        }

        return de.componentInstance[inputProperty];
    }

    /**
     * Returns the debug element for the specified selector.
     *
     * @param {string} selector
     * @returns {DebugElement}
     */
    function getDebugElement(selector: string): DebugElement {

        return fixture.debugElement.query(By.css(selector));
    }

    /**
     * Returns the inner html text, specified by selector.
     *
     * @param {string} selector
     * @returns {string}
     */
    function getDEInnerHtmlText(selector: string): string {

        const de = getDebugElement(selector);

        if ( !de ) {

            return;
        }

        return de.nativeElement.innerText;
    }
});
