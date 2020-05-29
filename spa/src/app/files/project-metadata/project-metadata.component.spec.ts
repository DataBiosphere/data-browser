/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectMetadata.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatProgressSpinnerModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs/index";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DataDownloadCitationComponent } from "../data-download-citation/data-download-citation.component";
import { PROJECT_DETAIL_SINGLE_VALUES } from "../project/hca-project-mapper.mock";
import { LeftBarComponent } from "../left-bar/left-bar.component";
import { ProjectDownloadManifestComponent } from "../project-download-manifest/project-download-manifest.component";
import { ProjectMetadataComponent } from "./project-metadata.component";
import { FileManifestService } from "../shared/file-manifest.service";
import { ProjectAnalyticsService } from "../project/project-analytics.service";

describe("ProjectMetadataComponent", () => {

    let component: ProjectMetadataComponent;
    let fixture: ComponentFixture<ProjectMetadataComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Heading labels
    const HEADING_PROJECT_METADATA = "Project Metadata";

    // Component input property
    const INPUT_PROPERTY_PROJECT_ID = "projectId";
    const INPUT_PROPERTY_PROJECT_TITLE = "projectTitle";

    // Selectors
    const SELECTOR_H2 = "h2.fontsize-xl";
    const SELECTOR_PROJECT_DOWNLOAD_MANIFEST = "project-download-manifest";

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataDownloadCitationComponent,
                LeftBarComponent,
                ProjectDownloadManifestComponent,
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
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "trackRequestCohortManifest",
                        "trackDownloadCohortManifest",
                        "trackCopyToClipboardCohortManifestLink",
                        "trackDownloadProjectManifest",
                        "trackCopyToClipboardProjectManifestLink"
                    ])
                },
                {
                    provide: ProjectAnalyticsService,
                    useValue: jasmine.createSpyObj("ProjectAnalyticsService", [
                        "trackTabView"
                    ])
                },
                {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectMetadataComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm "Project Metadata" is displayed.
     */
    it(`displays "Project Metadata"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
        );

        fixture.detectChanges();

        // Confirm title is displayed
        expect(getDEInnerHtmlText(SELECTOR_H2)).toEqual(HEADING_PROJECT_METADATA);
    });

    /**
     * Confirm component project-download-manifest is displayed.
     */
    it("displays component project download manifest", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(getDebugElement(SELECTOR_PROJECT_DOWNLOAD_MANIFEST)).toBeDefined();
    });

    /**
     * Confirm component project-download-manifest input property project id is the project id.
     */
    it("displays component project download manifest input property project id is the project id", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
        );

        fixture.detectChanges();

        // Confirm input property value
        expect(getComponentInputPropertyValue(SELECTOR_PROJECT_DOWNLOAD_MANIFEST, INPUT_PROPERTY_PROJECT_ID)).toEqual(PROJECT_DETAIL_SINGLE_VALUES.entryId);
    });

    /**
     * Confirm component project-download-manifest input property project title is the project title.
     */
    it("displays component project download manifest input property project title is the project title", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
        );

        fixture.detectChanges();

        // Confirm input property value
        expect(getComponentInputPropertyValue(SELECTOR_PROJECT_DOWNLOAD_MANIFEST, INPUT_PROPERTY_PROJECT_TITLE)).toEqual(PROJECT_DETAIL_SINGLE_VALUES.projectTitle);
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
