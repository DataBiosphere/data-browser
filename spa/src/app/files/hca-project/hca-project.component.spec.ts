/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAProject.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatProgressSpinnerModule, MatTooltipModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { DeviceDetectorService } from "ngx-device-detector";
import { of } from "rxjs";

// App dependencies
import { CcPipeModule } from "../../cc-pipe/cc-pipe.module";
import { ConfigService } from "../../config/config.service";
import { HCASectionTitleComponent } from "../../shared/hca-section-title/hca-section-title.component";
import { HCATabComponent } from "../../shared/hca-tab/hca-tab";
import { PopLayoutComponent } from "../../shared/pop-layout/pop-layout.component";
import { AnalysisProtocolPipelineLinkerComponent } from "../analysis-protocol-pipeline-linker/analysis-protocol-pipeline-linker.component";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { ProjectIntegrationsComponent } from "../project-integrations/project-integrations.component";
import { ProjectTSVDownloadComponent } from "../project-tsv-download/project-tsv-download.component";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { HCAProjectComponent } from "./hca-project.component";
import {
    PROJECT_DETAIL_EMPTY_VALUES, PROJECT_DETAIL_MULTIPLE_VALUES,
    PROJECT_DETAIL_SINGLE_VALUES, PROJECT_DETAIL_SPECIFIC_VALUES,
    PROJECT_DETAIL_UNSPECIFIED_VALUES, PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT
} from "./hca-project-mapper.mock";
import { GenusSpecies } from "../shared/genus-species.model";
import { SpeciesMatrixUrls } from "../shared/species-matrix-urls.model";

describe("HCAProjectComponent", () => {

    let component: HCAProjectComponent;
    let fixture: ComponentFixture<HCAProjectComponent>;

    const testConfig = jasmine.createSpyObj("ConfigService", ["getPortalURL"]);
    const testRouter = jasmine.createSpyObj("Router", ["navigate"]);
    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Create response for testConfig.getPortalUrl()
    testConfig.getPortalURL.and.returnValue("https://test.com");

    // Class names
    const CLASSNAME_BREAK = "break";
    const CLASSNAME_CITATION = ".citation";
    const CLASSNAME_CITATION_URL = ".citation .url";
    const CLASSNAME_PROJECT_DETAILS_LHS = ".project-details .lhs";
    const CLASSNAME_PROJECT_DETAILS_RHS = ".project-details .rhs";

    // Component input property
    const COMPONENT_INPUT_PROPERTY_COPY_TO_CLIPBOARD_LINK = "copyToClipboardLink";

    // Component names
    const COMPONENT_NAME_COPY_TO_CLIPBOARD = "copy-to-clipboard";

    // Heading labels
    const HEADING_CITATION = "Citation";
    const HEADING_EXTERNAL_RESOURCES = "External Resources";

    // Project matrix urls
    const SPECIES_URLS_HOMO_SAPIENS = new SpeciesMatrixUrls(
        "1234",
        "https://test.com/1234.homo_sapiens.csv.zip",
        "https://test.com/1234.homo_sapiens.loom",
        "https://test.com/1234.homo_sapiens.mtx.zip"
    );
    const PROJECT_MATRIX_URLS_SINGLE_SPECIES = new ProjectMatrixUrls("1234", new Map([
        [GenusSpecies.HOMO_SAPIENS, SPECIES_URLS_HOMO_SAPIENS]
    ]));

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

    // Test values
    const TEST_VALUE_CITATION_URL = `${testConfig.getPortalURL()}/explore/projects/${PROJECT_DETAIL_SINGLE_VALUES.entryId}`;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AnalysisProtocolPipelineLinkerComponent,
                CopyToClipboardComponent,
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
                ClipboardModule,
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
     * Confirm get citation link returns project detail page url.
     */
    it("should get citation link returns project detail page url", () => {

        const projectUrl = component.getCitationLink(PROJECT_DETAIL_SINGLE_VALUES.entryId);

        // Confirm project detail page url is returned
        expect(projectUrl).toEqual(TEST_VALUE_CITATION_URL);
    });

    /**
     * Confirm is short name sentence returns true when project label is sentence case.
     */
    it("should is short name sentence returns true when project label is sentence case", () => {

        const shortNameSentence = component.isShortNameSentence(PROJECT_DETAIL_SPECIFIC_VALUES.projectShortname);

        // Confirm true is returned
        expect(shortNameSentence).toEqual(true);
    });

    /**
     * Confirm is short name sentence returns false when project label is not sentence case.
     */
    it("should is short name sentence returns false when project label is not sentence case", () => {

        const shortNameSentence = component.isShortNameSentence(PROJECT_DETAIL_SINGLE_VALUES.projectShortname);

        // Confirm false is returned
        expect(shortNameSentence).toEqual(false);
    });

    /**
     * Confirm "Citation" is displayed.
     */
    it(`should display "Citation"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Citation" is displayed
        expect(isHeadingDisplayed(HEADING_CITATION)).toEqual(true);
    });

    /**
     * Confirm citation url is displayed.
     */
    it("should display citation url", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm url is displayed
        expect(getDEInnerHtmlText(CLASSNAME_CITATION_URL)).toEqual(TEST_VALUE_CITATION_URL);
    });

    /**
     * Confirm component <copy-to-clipboard> is displayed for citation url.
     */
    it("should display component copy-to-clipboard for citation url", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(getChildrenDEsByChildName(CLASSNAME_CITATION, COMPONENT_NAME_COPY_TO_CLIPBOARD)).not.toBe(null);
    });

    /**
     * Confirm component <copy-to-clipboard> input property copy to clipboard link is the citation url.
     */
    it("should display component copy-to-clipboard input property copy to clipboard link is the citation url", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        const copyToClipboard = getChildrenDEsByChildName(CLASSNAME_CITATION, COMPONENT_NAME_COPY_TO_CLIPBOARD)[0];

        // Confirm input property copy to clipboard link is citation url
        expect(getComponentInputPropertyValue(copyToClipboard, COMPONENT_INPUT_PROPERTY_COPY_TO_CLIPBOARD_LINK)).toEqual(TEST_VALUE_CITATION_URL);
    });

    /**
     * Confirm "Project Label" is displayed.
     */
    it(`should display "Project Label"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Project Label" is displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_PROJECT_SHORTNAME, CLASSNAME_PROJECT_DETAILS_LHS)).toEqual(true);
    });

    /**
     * Confirm class "break" is not displayed when "projectShortname" is sentence case.
     */
    it(`should not display class "break" when "projectShortname" is sentence case`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SPECIFIC_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        const projectDetailClasses = getProjectDetailClasses(PROJECT_LABEL_PROJECT_SHORTNAME);

        // Confirm class is not displayed
        expect(projectDetailClasses[CLASSNAME_BREAK]).toEqual(false);
    });

    /**
     * Confirm class "break" is displayed when "projectShortname" is not sentence case.
     */
    it(`should display class "break" when "projectShortname" is not sentence case`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        const projectDetailClasses = getProjectDetailClasses(PROJECT_LABEL_PROJECT_SHORTNAME);

        // Confirm class is displayed
        expect(projectDetailClasses[CLASSNAME_BREAK]).toEqual(true);
    });

    /**
     * Confirm "Sample Type" is displayed.
     */
    it(`should display "Sample Type"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Sample Type" is displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_SAMPLE_ENTITY_TYPE, CLASSNAME_PROJECT_DETAILS_LHS)).toEqual(true);
    });

    /**
     * Confirm "Unspecified" is displayed when sample type is empty.
     */
    it(`should display "Unspecified" when sample type is empty`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_EMPTY_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Modal Organ" is displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_MODEL_ORGAN, CLASSNAME_PROJECT_DETAILS_LHS)).toEqual(true);
    });

    /**
     * Confirm "Modal Organ" is not displayed when sample entity type is "specimens".
     */
    it(`should not display "Modal Organ" when sample entity type is "specimens"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SPECIFIC_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Modal Organ" is not displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_MODEL_ORGAN, CLASSNAME_PROJECT_DETAILS_LHS)).toEqual(false);
    });

    /**
     * Confirm "Unspecified" is displayed when model organ is empty.
     */
    it(`should display "Unspecified" when model organ is empty`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_EMPTY_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
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
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Analysis Protocol" is displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_WORKFLOW, CLASSNAME_PROJECT_DETAILS_LHS)).toEqual(true);
    });

    /**
     * Confirm "Analysis Protocol" is not displayed when workflow is "Unspecified".
     */
    it(`should not display "Analysis Protocol" when workflow is "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_UNSPECIFIED_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "Analysis Protocol" is not displayed
        expect(isProjectDetailLabelDisplayed(PROJECT_LABEL_WORKFLOW, CLASSNAME_PROJECT_DETAILS_LHS)).toEqual(false);
    });

    /**
     * Confirm component <analysis-protocol-pipeline-linker> is displayed when when workflow is not "Unspecified".
     */
    it(`should display component analysis protocol pipeline linker when workflow is not "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        const analysisProtocolPipelineLinkerEl = fixture.debugElement.nativeElement.querySelector("analysis-protocol-pipeline-linker");

        // Confirm component analysis protocol pipeline linker is displayed when workflow is not "Unspecified"
        expect(analysisProtocolPipelineLinkerEl).not.toBe(null);
    });

    /**
     * Confirm "External Resources" is displayed.
     */
    it(`should display "External Resources"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        // Confirm "External Resources" is displayed
        expect(isHeadingDisplayed(HEADING_EXTERNAL_RESOURCES)).toEqual(true);
    });

    /**
     * Confirm component <project-integrations> is displayed when project integration is single value.
     */
    it("should display component project integrations when project integration is single value", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of(PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT) // integrations
        );

        fixture.detectChanges();

        const projectIntegrationsEl = fixture.debugElement.nativeElement.querySelector("project-integrations");

        // Confirm component project-integrations is displayed when integrations is single value
        expect(projectIntegrationsEl).not.toBe(null);
    });

    /**
     * Confirm component <project-integrations> is not displayed when project integration is empty.
     */
    it("should not display component project integrations when project integration is empty", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUES), // selected project detail
            of(PROJECT_MATRIX_URLS_SINGLE_SPECIES), // project matrix URLs
            of([]), // project ids
            of([]) // integrations
        );

        fixture.detectChanges();

        const projectIntegrationsEl = fixture.debugElement.nativeElement.querySelector("project-integrations");

        // Confirm component project-integrations is not displayed when integrations is empty
        expect(projectIntegrationsEl).toBe(null);
    });

    /**
     * Returns the debug elements, specified by parent class name and child tag name.
     *
     * @param {string} childName
     * @param {string} componentName
     * @returns {DebugElement[]}
     */
    function getChildrenDEsByChildName(className: string, childName: string): DebugElement[] {

        const de = getDebugElement(className);

        if ( !de ) {
            return;
        }

        return de.children.filter(child => child.name === childName);
    }

    /**
     * Returns the component input property value specified by input property.
     *
     * @param {DebugElement} component
     * @param {string} inputProperty
     * @returns {any}
     */
    function getComponentInputPropertyValue(component: DebugElement, inputProperty: string): any {

        if ( !component ) {
            return;
        }

        return component.componentInstance[inputProperty];
    }

    /**
     * Returns the debug element for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement}
     */
    function getDebugElement(className: string): DebugElement {

        return fixture.debugElement.query(By.css(className));
    }

    /**
     * Returns the inner html text, specified by class name.
     *
     * @param {string} className
     * @returns {any}
     */
    function getDEInnerHtmlText(className: string): any {

        const de = getDebugElement(className);

        if ( !de ) {

            return;
        }

        return de.nativeElement.innerText;
    }

    /**
     * Returns the project detail for the specified project detail label.
     *
     * @param {string} projectDetailLabel
     * @returns {DebugElement}
     */
    function getProjectDetail(projectDetailLabel: string): DebugElement {

        const projectDetailValueEls = fixture.debugElement.queryAll(By.css(CLASSNAME_PROJECT_DETAILS_RHS));

        if ( !projectDetailValueEls ) {

            return;
        }

        const projectDetailIndex = PROJECT_DETAIL_DISPLAY_ORDER.indexOf(projectDetailLabel);

        return projectDetailValueEls[projectDetailIndex];
    }

    /**
     * Returns the project detail classes for the specified project detail.
     *
     * @param {string} projectDetailLabel
     * @returns {Object}
     */
    function getProjectDetailClasses(projectDetailLabel: string): Object {

        const projectDetail = getProjectDetail(projectDetailLabel);

        if ( !projectDetail ) {

            return;
        }

        return projectDetail.classes;
    }

    /**
     * Returns the project detail value for the specified project detail.
     *
     * @param {string} projectDetailLabel
     * @returns {any}
     */
    function getProjectDetailValue(projectDetailLabel: string): any {

        const projectDetail = getProjectDetail(projectDetailLabel);

        if ( !projectDetail ) {

            return;
        }

        return projectDetail.nativeElement.innerText;
    }


    /**
     * Returns true if heading is displayed.
     *
     * @param {string} heading
     * @returns {boolean}
     */
    function isHeadingDisplayed(heading: string): boolean {

        const headingEls = fixture.debugElement.queryAll(By.css("h4"));

        if ( !headingEls ) {

            return false;
        }

        return headingEls.some(headingEl => headingEl.nativeElement.innerText === heading);
    }

    /**
     * Returns true if label is displayed.
     *
     * @param {string} label
     * @param {string} queryString
     * @returns {boolean}
     */
    function isProjectDetailLabelDisplayed(label: string, queryString: string): boolean {

        const projectDetailLabelEls = fixture.debugElement.queryAll(By.css(queryString));

        if ( !projectDetailLabelEls ) {

            return false;
        }

        return projectDetailLabelEls.some(projectDetailLabelEl => projectDetailLabelEl.nativeElement.innerText === label);
    }
});
