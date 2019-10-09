/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAProject.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatProgressSpinnerModule, MatTooltipModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { DeviceDetectorService } from "ngx-device-detector";

// App dependencies
import { CcPipeModule } from "../../cc-pipe/cc-pipe.module";
import { ConfigService } from "../../config/config.service";
import { HCASectionTitleComponent } from "../../shared/hca-section-title/hca-section-title.component";
import { HCATabComponent } from "../../shared/hca-tab/hca-tab";
import { PopLayoutComponent } from "../../shared/pop-layout/pop-layout.component";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { ProjectTSVDownloadComponent } from "../project-tsv-download/project-tsv-download.component";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { HCAProjectComponent } from "./hca-project.component";
import {
    PROJECT_DETAIL_EMPTY_VALUES, PROJECT_DETAIL_MULTIPLE_VALUES,
    PROJECT_DETAIL_SINGLE_VALUES, PROJECT_DETAIL_SPECIFIC_VALUES,
    PROJECT_DETAIL_UNSPECIFIED_VALUES, PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT
} from "./hca-project-mapper.mock";
import { ProjectIntegrationsComponent } from "../project-integrations/project-integrations.component";

describe("HCAProjectComponent", () => {

    let component: HCAProjectComponent;
    let fixture: ComponentFixture<HCAProjectComponent>;

    const testConfig = jasmine.createSpyObj("ConfigService", ["getPortalURL"]);
    const testRouter = jasmine.createSpyObj("Router", ["navigate"]);
    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Heading labels
    const HEADING_TERTIARY_PORTALS = "Tertiary Portals";

    // Project matrix urls
    const PROJECT_DETAIL_PROJECT_MATRIX_URLS = new ProjectMatrixUrls("2cd14cf5-f8e0-4c97-91a2-9e8957f41ea8", "https://dev.data.humancellatlas.org/project-assets/project-matrices/537f5501-a964-4ade-91c8-7bd4a23b049d.csv.zip", "https://dev.data.humancellatlas.org/project-assets/project-matrices/537f5501-a964-4ade-91c8-7bd4a23b049d.loom", "https://dev.data.humancellatlas.org/project-assets/project-matrices/537f5501-a964-4ade-91c8-7bd4a23b049d.mtx.zip");

    // Project details
    const PROJECT_LABEL_DONOR_COUNT = "Donor Count";
    const PROJECT_LABEL_FILE_FORMAT = "File Format";
    const PROJECT_LABEL_DISEASE = "Disease Status";
    const PROJECT_LABEL_GENUS_SPECIES = "Species";
    const PROJECT_LABEL_LIBRARY_CONSTRUCTION_APPROACH = "Library Construction Method";
    const PROJECT_LABEL_ORGAN = "Organ";
    const PROJECT_LABEL_ORGAN_PART = "Organ Part";
    const PROJECT_LABEL_MODEL_ORGAN = "Model Organ";
    const PROJECT_LABEL_PAIRED_END = "Paired End";
    const PROJECT_LABEL_PROJECT_SHORTNAME = "Project Label";
    const PROJECT_LABEL_SAMPLE_ENTITY_TYPE = "Sample Type";
    const PROJECT_LABEL_TOTAL_CELLS = "Cell Count Estimate";
    const PROJECT_LABEL_WORKFLOW = "Analysis Protocol";

    // Project detail display order
    // Model organ and analysis protocol display conditionally, controlled by sample type and workflow values respectively
    const PROJECT_DETAIL_DISPLAY_ORDER = [
        PROJECT_LABEL_PROJECT_SHORTNAME,
        PROJECT_LABEL_GENUS_SPECIES,
        PROJECT_LABEL_SAMPLE_ENTITY_TYPE,
        PROJECT_LABEL_ORGAN,
        PROJECT_LABEL_ORGAN_PART,
        PROJECT_LABEL_MODEL_ORGAN,
        PROJECT_LABEL_DISEASE,
        PROJECT_LABEL_LIBRARY_CONSTRUCTION_APPROACH,
        PROJECT_LABEL_PAIRED_END,
        PROJECT_LABEL_WORKFLOW,
        PROJECT_LABEL_FILE_FORMAT,
        PROJECT_LABEL_TOTAL_CELLS,
        PROJECT_LABEL_DONOR_COUNT
    ];

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAProjectComponent,
                HCASectionTitleComponent,
                HCATabComponent,
                HCATooltipComponent,
                PopLayoutComponent,
                ProjectIntegrationsComponent,
                ProjectTSVDownloadComponent
            ],
            imports: [
                CcPipeModule,
                MatIconModule,
                MatTooltipModule,
                MatProgressSpinnerModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: jasmine.createSpyObj("paramMap", ["get"])
                        }
                    }
                },
                {
                    provide: ConfigService,
                    useValue: testConfig
                },
                DeviceDetectorService,
                {
                    provide: Router,
                    useValue: testRouter
                },
                {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAProjectComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Incomplete test
     */
    xit("TBD", () => {

        // TODO - pending test
        // TODO - test for null values tbc
    });

    /**
     * Confirm "Sample Type" is displayed.
     */
    it(`should display "Sample Type"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Sample Type" is displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_SAMPLE_ENTITY_TYPE)).toEqual(true);
    });

    /**
     * Confirm "Unspecified" is displayed when sample type is empty.
     */
    it(`should display "Unspecified" when sample type is empty`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_EMPTY_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Unspecified" is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_SAMPLE_ENTITY_TYPE)).toEqual("Unspecified");
    });

    /**
     * Confirm "Unspecified" is displayed when sample type is "Unspecified".
     */
    it(`should display "Unspecified" when sample type is "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_UNSPECIFIED_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Unspecified" is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_SAMPLE_ENTITY_TYPE)).toEqual("Unspecified");
    });

    /**
     * Confirm single value is displayed when sample type is single value.
     */
    it("should display single value when sample type is single value", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm single value is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_SAMPLE_ENTITY_TYPE)).toEqual(PROJECT_DETAIL_SINGLE_VALUES.sampleEntityType);
    });

    /**
     * Confirm multiple string value is displayed when multiple sample types.
     */
    it("should display multiple string value when multiple sample types", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_MULTIPLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm single value is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_SAMPLE_ENTITY_TYPE)).toEqual(PROJECT_DETAIL_MULTIPLE_VALUES.sampleEntityType);
    });

    /**
     * Confirm "Modal Organ" is displayed when sample entity type is not "specimens".
     */
    it(`should display "Modal Organ" when sample entity type is not "specimens"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Modal Organ" is displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_MODEL_ORGAN)).toEqual(true);
    });

    /**
     * Confirm "Modal Organ" is not displayed when sample entity type is "specimens".
     */
    it(`should not display "Modal Organ" when sample entity type is "specimens"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SPECIFIC_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Modal Organ" is not displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_MODEL_ORGAN)).toEqual(false);
    });

    /**
     * Confirm "Unspecified" is displayed when model organ is empty.
     */
    it(`should display "Unspecified" when model organ is empty`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_EMPTY_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Unspecified" is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_MODEL_ORGAN)).toEqual("Unspecified");
    });

    /**
     * Confirm "Unspecified" is displayed when model organ is "Unspecified".
     */
    it(`should display "Unspecified" when model organ is "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_UNSPECIFIED_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Unspecified" is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_MODEL_ORGAN)).toEqual("Unspecified");
    });

    /**
     * Confirm single value is displayed when model organ is single value.
     */
    it("should display single value when model organ is single value", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm single value is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_MODEL_ORGAN)).toEqual(PROJECT_DETAIL_SINGLE_VALUES.modelOrgan);
    });

    /**
     * Confirm multiple string value is displayed when multiple model organs.
     */
    it("should display multiple string value when multiple model organs", () => {
        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_MULTIPLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm single value is displayed
        expect(getProjectDetailValue(PROJECT_LABEL_MODEL_ORGAN)).toEqual(PROJECT_DETAIL_MULTIPLE_VALUES.modelOrgan);
    });

    /**
     * Confirm "Analysis Protocol" is displayed when workflow is not "Unspecified".
     */
    it(`should display "Analysis Protocol" when workflow is not "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Analysis Protocol" is displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_WORKFLOW)).toEqual(true);
    });

    /**
     * Confirm "Analysis Protocol" is not displayed when workflow is "Unspecified".
     */
    it(`should not display "Analysis Protocol" when workflow is "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_UNSPECIFIED_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Analysis Protocol" is not displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_WORKFLOW)).toEqual(false);
    });

    /**
     * Confirm "Tertiary Portals" is displayed.
     */
    it(`should display "Tertiary Portals"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Tertiary Portals" is displayed
        expect(isHeadingDisplayed(HEADING_TERTIARY_PORTALS)).toEqual(true);
    });

    /**
     * Confirm <project-integrations> is displayed when project integration is single value.
     */
    it("should display component project integrations when project integration is single value", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of(PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT) // integrations
        );

        fixture.detectChanges();

        const projectIntegrationsEl = fixture.debugElement.nativeElement.querySelector("project-integrations");

        // Confirm component project-integrations is displayed when integrations is single value
        expect(projectIntegrationsEl).not.toBe(null);
    });

    /**
     * Confirm <project-integrations> is not displayed when project integration is empty.
     */
    it("should not display component project integrations when project integration is empty", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        const projectIntegrationsEl = fixture.debugElement.nativeElement.querySelector("project-integrations");

        // Confirm component project-integrations is not displayed when integrations is empty
        expect(projectIntegrationsEl).toBe(null);
    });

    /**
     * Returns the project detail value for the specified project detail.
     *
     * @param {string} projectDetailLabel
     * @returns {any}
     */
    function getProjectDetailValue(projectDetailLabel: string): any {

        const projectDetailValueEls = fixture.debugElement.queryAll(By.css(".project-details .rhs"));

        if ( !projectDetailValueEls.length ) {
            return null;
        }

        const projectDetailIndex = PROJECT_DETAIL_DISPLAY_ORDER.indexOf(projectDetailLabel);

        return projectDetailValueEls[projectDetailIndex].nativeElement.innerText;
    }


    /**
     * Returns true if heading is displayed.
     *
     * @param {string} heading
     * @returns {boolean}
     */
    function isHeadingDisplayed(heading: string): boolean {

        const headingEls = fixture.debugElement.queryAll(By.css("h4"));

        return headingEls.some(headingEl => headingEl.nativeElement.innerText === heading);
    }

    /**
     * Returns true if project detail label is displayed.
     *
     * @param {string} projectDetailLabel
     * @returns {boolean}
     */
    function isProjectDetailLabelDisplayed(projectDetailLabel: string): boolean {

        const projectDetailLabelEls = fixture.debugElement.queryAll(By.css(".project-details .lhs"));

        return projectDetailLabelEls.some(projectDetailLabelEl => projectDetailLabelEl.nativeElement.innerText === projectDetailLabel);
    }
});
